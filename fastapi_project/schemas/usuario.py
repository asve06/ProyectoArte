from pydantic import BaseModel, EmailStr
from enum import Enum
from datetime import datetime

class RolEnum(str, Enum):
    admin = "admin"
    usuario = "usuario"

class UsuarioBase(BaseModel):
    nombre: str
    email: EmailStr
    rol: RolEnum

class UsuarioCreate(UsuarioBase):
    password_hash: str

class UsuarioRead(UsuarioBase):
    id: int
    fecha_creacion: datetime

    class Config:
        from_attributes = True
