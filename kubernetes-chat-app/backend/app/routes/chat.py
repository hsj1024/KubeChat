from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from typing import List

router = APIRouter()
connections: List[WebSocket] = []

@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    connections.append(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            for connection in connections:
                await connection.send_text(f"Message: {data}")
    except WebSocketDisconnect:
        connections.remove(websocket)  
