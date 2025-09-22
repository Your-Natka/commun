from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from .routers import auth, messages, files, users
from .websocket_manager import manager
from .db import init_db
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS
origins = [
    "http://localhost:5173",  # порт Vite
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth.router, prefix="/auth")
app.include_router(messages.router, prefix="/messages")
app.include_router(files.router, prefix="/files")
app.include_router(users.router, prefix="/users")

def init_db():
    Base.metadata.create_all(bind=engine)

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
