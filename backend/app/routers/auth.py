from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from .. import models, schemas, db
from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import jwt
from fastapi.security import OAuth2PasswordRequestForm

router = APIRouter(prefix="/auth", tags=["auth"])

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
SECRET_KEY = "replace-with-strong-secret"  # override via env
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24

def get_password_hash(password: str):
    return pwd_context.hash(password)

def verify_password(plain, hashed):
    return pwd_context.verify(plain, hashed)

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

@router.post("/register", response_model=schemas.UserOut, summary="Register new user")
def register(user_in: schemas.UserCreate):
    session: Session = db.SessionLocal()
    try:
        # check existing
        existing = session.query(models.User).filter(
            (models.User.username == user_in.username) | (models.User.email == user_in.email)
        ).first()
        if existing:
            raise HTTPException(status_code=400, detail="Username or email already registered")

        user = models.User(
            username=user_in.username,
            email=user_in.email,
            hashed_password=get_password_hash(user_in.password)
        )
        session.add(user)
        session.commit()
        session.refresh(user)
        return user
    finally:
        session.close()

@router.post("/token", response_model=schemas.Token, summary="Get access token")
def login_for_token(form_data: OAuth2PasswordRequestForm = Depends()):
    session: Session = db.SessionLocal()
    try:
        user = session.query(models.User).filter(models.User.username == form_data.username).first()
        if not user or not verify_password(form_data.password, user.hashed_password):
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect username or password")
        access_token = create_access_token({"sub": str(user.id)})
        return {"access_token": access_token, "token_type": "bearer"}
    finally:
        session.close()
