# KubeChat
Kubernetes 기반 실시간 채팅 앱

✅ 최종 목표 디렉토리 구조 (gitignore 포함)
```
kubernetes-chat-app/
├── .gitignore               # 전체 프로젝트 공통 .gitignore
├── frontend/                # 프론트엔드 (React)
│   ├── .gitignore           # 프론트엔드 전용 .gitignore (Node.js 관련 파일 제외)
│   ├── node_modules/        # npm install 시 자동 생성 (Git에 포함 X)
│   ├── build/               # React 빌드 결과물 (Git에 포함 X)
│   ├── src/                 # 소스 코드
│   ├── public/              # 정적 파일
│   ├── package.json         # npm 패키지 목록
│   ├── package-lock.json    # 패키지 버전 고정 (Git에 포함 O)
│   ├── .env                 # 환경 변수 파일 (Git에 포함 X)
│   ├── Dockerfile           # 프론트엔드용 Docker 설정
│   └── README.md
├── backend/                 # 백엔드 (FastAPI)
│   ├── .gitignore           # 백엔드 전용 .gitignore (Python 관련 파일 제외)
│   ├── venv/                # Python 가상 환경 폴더 (Git에 포함 X)
│   ├── app/                 # FastAPI 코드
│   │   ├── main.py          # FastAPI 진입점
│   │   ├── models.py        # 데이터베이스 모델
│   │   ├── database.py      # 데이터베이스 연결
│   │   ├── routes/          # API 엔드포인트 모음
│   │   ├── services/        # 비즈니스 로직
│   │   ├── dependencies.py  # 의존성 관리
│   ├── database/            # 데이터베이스 관련 파일
│   ├── migrations/          # 데이터베이스 마이그레이션 폴더
│   ├── .env                 # 백엔드 환경 변수 파일 (Git에 포함 X)
│   ├── requirements.txt     # Python 패키지 목록
│   ├── Dockerfile           # 백엔드용 Docker 설정
│   ├── gunicorn.conf.py     # Gunicorn 설정 파일 (배포용)
│   ├── start.sh             # FastAPI 서버 실행 스크립트
│   ├── tests/               # 테스트 코드
│   └── README.md
└── k8s/                     # Kubernetes 배포 설정 파일
    ├── backend-deployment.yaml    # 백엔드 배포 설정
    ├── frontend-deployment.yaml   # 프론트엔드 배포 설정
    ├── database-deployment.yaml   # PostgreSQL 배포 설정
    ├── redis-deployment.yaml      # Redis 배포 설정
    ├── ingress.yaml               # Ingress 설정 (도메인 매핑)
    ├── secrets.yaml               # Kubernetes 환경 변수 설정
    ├── configmap.yaml             # 설정 파일 매핑
    ├── namespace.yaml             # 네임스페이스 설정
    ├── autoscaling.yaml           # Auto Scaling 설정
    └── README.md
```
