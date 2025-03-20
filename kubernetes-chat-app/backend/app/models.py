from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from app.database import Base
import datetime

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    password = Column(String)
    
class Message(Base):
    __tablename__ = "messages"
    id = Column(Integer, primary_key=True, index=True)
    sender_id = Column(Integer, ForeignKey("users.id"))
    room_id = Column(Integer, ForeignKey("chat_rooms.id"))  # 채팅방 ID 추가
    username = Column(String, nullable=False)  # ✅ username 필드 추가
    content = Column(String)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)
    sender = relationship("User")

class ChatRoom(Base):
    __tablename__ = "chat_rooms"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)  # 채팅방 이름
    messages = relationship("Message", backref="chat_room", cascade="all, delete")