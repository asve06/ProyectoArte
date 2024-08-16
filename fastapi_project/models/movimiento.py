from sqlalchemy import Column, Integer, String
from config.database import Base

class Movimiento(Base):
    __tablename__ = 'movimientos'

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(255), nullable=False, unique=True)