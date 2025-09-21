from fastapi import APIRouter

router = APIRouter()

@router.get("/list")
def list_users():
    return {"users": []}  # поки порожній список
