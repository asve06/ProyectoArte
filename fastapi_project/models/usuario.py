from sqlalchemy import Column, Integer, String, Enum, TIMESTAMP
from sqlalchemy.sql import func
from config.database import Base
import enum

class RolEnum(enum.Enum):
    admin = "admin"
    usuario = "usuario"

class Usuario(Base):
    __tablename__ = 'usuarios'

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False, unique=True)
    rol = Column(Enum(RolEnum), nullable=False)
    password_hash = Column(String(255), nullable=False)
    fecha_creacion = Column(TIMESTAMP, server_default=func.now())