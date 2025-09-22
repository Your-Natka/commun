from pydantic import BaseModel, EmailStr

class UserBase(BaseModel):
    id: int
    username: str
    email: str

    class Config:
        from_attributes = True

class UserInDB(UserBase):
    hashed_password: str
    
class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id: int
    username: str
    email: EmailStr

    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str