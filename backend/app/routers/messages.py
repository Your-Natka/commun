from fastapi import APIRouter

router = APIRouter()

@router.get("/all")
def get_messages():
    return {"messages": []}  # поки порожній список
