from sqlalchemy import Column, Integer, String
from config.database import Base

class Ubicacion(Base):
    __tablename__ = 'ubicaciones'

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(255), nullable=False)
    continente = Column(String(255), nullable=False)
    pais = Column(String(255), nullable=False)
    ciudad = Column(String(255), nullable=False)