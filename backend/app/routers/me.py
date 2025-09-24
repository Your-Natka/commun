from fastapi import APIRouter, Depends
from ..dependencies import get_current_user

router = APIRouter()

@router.get("/me")
def read_me(current_user = Depends(get_current_user)):
    return {"id": current_user.id, "username": current_user.username, "email": current_user.email}