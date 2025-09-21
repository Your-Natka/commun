from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class FileBase(BaseModel):
    filename: str
    url: str

class FileCreate(FileBase):
    pass

class File(FileBase):
    id: int
    class Config:
        orm_mode = True

class MessageBase(BaseModel):
    content: str

class MessageCreate(MessageBase):
    recipient_id: int
    files: Optional[List[FileCreate]] = []

class Message(MessageBase):
    id: int
    timestamp: datetime
    sender_id: int
    recipient_id: int
    files: List[File] = []
    class Config:
        orm_mode = True

class UserBase(BaseModel):
    username: str
    email: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    class Config:
        orm_mode = True
