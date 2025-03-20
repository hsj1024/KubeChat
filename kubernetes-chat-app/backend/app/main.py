from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import chat, auth
from app.routes.chat import router as chat_router  # Chat 라우터 가져오기


app = FastAPI()

# ✅ CORS 설정 수정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 모든 도메인 허용 (보안상 필요 시 특정 도메인만 허용)
    allow_credentials=True,
    allow_methods=["*"],  #  모든 HTTP 메서드 허용 (GET, POST, OPTIONS 등)
    allow_headers=["*"],  #  모든 헤더 허용
)

app.include_router(chat_router)
app.include_router(auth.router)