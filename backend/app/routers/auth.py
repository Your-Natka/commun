from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from .. import models, schemas, db
from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import jwt
from fastapi.security import OAuth2PasswordRequestForm

router = APIRouter(tags=["auth"])

# ----------------- CONFIG -----------------
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
SECRET_KEY = "replace-with-strong-secret"  # бажано взяти з env
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24

# ----------------- HELPERS -----------------
def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)

def create_access_token(data: dict, expires_delta: timedelta | None = None) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# ----------------- ROUTES -----------------
@router.post("/register", response_model=schemas.UserOut, summary="Register new user")
def register(user_in: schemas.UserCreate):
    session: Session = db.SessionLocal()
    try:
        # check existing user
        existing = session.query(models.User).filter(
            (models.User.username == user_in.username) | (models.User.email == user_in.email)
        ).first()
        if existing:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Username or email already registered"
            )

        user = models.User(
            username=user_in.username,
            email=user_in.email,
            hashed_password=get_password_hash(user_in.password),
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
        user = session.query(models.User).filter(
            models.User.username == form_data.username
        ).first()

        if not user or not verify_password(form_data.password, user.hashed_password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect username or password",
                headers={"WWW-Authenticate": "Bearer"},
            )

        access_token = create_access_token({"sub": str(user.id)})
        return {"access_token": access_token, "token_type": "bearer"}
    finally:
        session.close()
