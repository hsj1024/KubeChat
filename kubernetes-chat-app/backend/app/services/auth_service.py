from app.database import SessionLocal
from app.models import User
from fastapi import HTTPException
from sqlalchemy.orm import Session
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_user(db: Session, username: str):
    return db.query(User).filter(User.username == username).first()

def register_user(user):
    db = SessionLocal()
    if get_user(db, user.username):
        raise HTTPException(status_code=400, detail="User already exists")
    
    hashed_password = pwd_context.hash(user.password)
    new_user = User(username=user.username, password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)  # ✅ 데이터 갱신 후 반환할 수 있도록 변경
    db.close()

    # ✅ `username`과 `id`까지 반환
    return {"message": "User registered successfully", "user": {"id": new_user.id, "username": new_user.username}}

def authenticate_user(user):
    db = SessionLocal()
    db_user = get_user(db, user.username)
    if not db_user or not pwd_context.verify(user.password, db_user.password):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    # ✅ 로그인 성공 시 `username`과 `id` 반환
    return {"message": "User authenticated", "user": {"id": db_user.id, "username": db_user.username}}
