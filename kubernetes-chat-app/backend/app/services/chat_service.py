from app.database import SessionLocal
from app.models import Message

def save_message(sender_id, content):
    db = SessionLocal()
    message = Message(sender_id=sender_id, content=content)
    db.add(message)
    db.commit()
    db.refresh(message)
    db.close()
    return message