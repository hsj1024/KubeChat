from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from app.services.auth_service import register_user, authenticate_user

router = APIRouter()

class User(BaseModel):
    username: str
    password: str

@router.post("/register")
def register(user: User):
    response = register_user(user)
    return response  # ✅ user 정보까지 포함하여 반환

@router.post("/login")
def login(user: User):
    response = authenticate_user(user)
    return response  # ✅ user 정보까지 포함하여 반환