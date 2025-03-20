from fastapi import APIRouter,Depends,HTTPException, WebSocket, WebSocketDisconnect, Query, Body
import json
from typing import Dict, List
from app.database import get_db
from app.models import ChatRoom
from sqlalchemy.orm import Session
from app.database import SessionLocal
from pydantic import BaseModel


router = APIRouter()
connections: Dict[int, List[WebSocket]] = {}

class ChatCreateRequest(BaseModel):
    room_name: str

@router.post("/chat/create")
def create_chat(
    chat_data: ChatCreateRequest = Body(...),  # ✅ `Body(...)` 명시적 추가
    db: Session = Depends(get_db)
):
    room_name = chat_data.room_name

    if not room_name:
        raise HTTPException(status_code=400, detail="Room name is required")

    existing_room = db.query(ChatRoom).filter(ChatRoom.name == room_name).first()
    if existing_room:
        raise HTTPException(status_code=400, detail="Chat room already exists")

    new_room = ChatRoom(name=room_name)
    db.add(new_room)
    db.commit()
    db.refresh(new_room)

    return {"message": "Chat room created", "room_id": new_room.id}


# ✅ 채팅방 목록 가져오기
@router.get("/chat/rooms", tags=["Chat"])
def get_chat_rooms(db: Session = Depends(get_db)):
    rooms = db.query(ChatRoom).all()
    return [{"id": room.id, "name": room.name} for room in rooms]

@router.websocket("/ws/{room_id}/{username}")  # ✅ 사용자 이름을 WebSocket 경로에서 받음
async def websocket_endpoint(websocket: WebSocket, room_id: int, username: str):
    await websocket.accept()

    if room_id not in connections:
        connections[room_id] = []
    connections[room_id].append(websocket)

    try:
        while True:
            data = await websocket.receive_text()
            print(f"📥 Received raw message: {data}") 

            try:
                message = json.loads(data)
                chat_message = message.get("message", "")

                response = json.dumps({
                    "username": username,  # ✅ WebSocket 연결 시 넘겨준 username 사용
                    "message": chat_message
                })

                # 🔥 모든 클라이언트에게 메시지 전송
                for connection in connections[room_id]:
                    await connection.send_text(response)

            except json.JSONDecodeError:
                print(f"⚠ JSON Decode Error: {data}")
                continue

    except WebSocketDisconnect:
        connections[room_id].remove(websocket)
        print(f"❌ Connection closed for room {room_id}")