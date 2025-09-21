from fastapi import APIRouter

router = APIRouter()

@router.get("/list")
def get_files():
    return {"files": []}  # поки порожній список
