from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel

router = APIRouter()

class User(BaseModel):
    username: str
    password: str
    
users_db = {}

@router.post("/register")
def register(user: User):
    if user.username in users_db:
        raise HTTPException(status_code=400, detail= "User already exists")
    users_db[user.username] = user.password
    return {"message": "User registered successfully"}

@router.post("/login")
def login(user: User):
    if users_db.get(user.username) != user.password:
        raise HTTPException(status_code=400, detail= "Invalid creditials")
    return {"message": "User Logged in"}