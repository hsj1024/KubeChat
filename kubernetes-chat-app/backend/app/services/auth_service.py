from app.database import SessionLocal
from app.models import User

def get_user(username: str):
    db = SessionLocal
    user = db.query(User).filter(User.username == username).first()
    db.close()
    return user 