from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .. import models, schemas, db

router = APIRouter(tags=["users"])

# залежність для отримання сесії
def get_db():
    session = db.SessionLocal()
    try:
        yield session
    finally:
        session.close()

@router.get("/list", response_model=list[schemas.UserOut], summary="List all users")
def list_users(db: Session = Depends(get_db)):
    users = db.query(models.User).all()
    return users