import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

# 환경 변수 로드
load_dotenv()

# 환경 변수에서 DATABASE_URL 가져오기 (없으면 기본값 사용)
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://user:password@localhost:5432/chatdb")

# SQLAlchemy 엔진 생성 (Connection Pool 설정 포함)
engine = create_engine(
    DATABASE_URL,
    pool_size=10,           # 최대 10개의 연결 유지
    max_overflow=20,        # 추가 요청 시 20개까지 확장 가능
    echo=True,              # SQL 쿼리 로그 출력 (디버깅용)
)

# 세션 설정
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 데이터베이스 모델의 기본 클래스
Base = declarative_base()

# DB 세션을 제공하는 함수 (FastAPI 의존성 주입)
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
