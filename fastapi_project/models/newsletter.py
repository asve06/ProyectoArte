from sqlalchemy import Column, Integer, Boolean, TIMESTAMP, ForeignKey
from sqlalchemy.sql import func
from config.database import Base

class Newsletter(Base):
    __tablename__ = 'newsletters'

    id = Column(Integer, primary_key=True, index=True)
    usuario_id = Column(Integer, ForeignKey('usuarios.id'))
    suscrito = Column(Boolean, default=True)
    fecha_suscripcion = Column(TIMESTAMP, server_default=func.now())