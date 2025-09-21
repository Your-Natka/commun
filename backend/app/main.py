from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from app.routers import auth, messages, files, users
from app.websocket_manager import manager
from app.db import init_db
import os

app = FastAPI()

app.include_router(auth.router, prefix="/auth")
app.include_router(messages.router, prefix="/messages")
app.include_router(files.router, prefix="/files")
app.include_router(users.router, prefix="/users")

@app.on_event("startup")
async def startup():
    await init_db()

@app.get("/")
def root():
    return {"message": "Backend is running 🚀"}

@app.websocket("/ws/{user_id}")
async def websocket_endpoint(websocket: WebSocket, user_id: int):
    await manager.connect(user_id, websocket)
    try:
        while True:
            data = await websocket.receive_json()
            if data.get("type") == "message":
                to = data["to"]
                await manager.send_personal_message(to, data)
    except WebSocketDisconnect:
        manager.disconnect(user_id)
