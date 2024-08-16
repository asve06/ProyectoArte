from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from config.database import Base

class Pintura(Base):
    __tablename__ = 'pinturas'

    id = Column(Integer, primary_key=True, index=True)
    obra_id = Column(Integer, ForeignKey('obras.id'))
    tecnica = Column(String(255))
    estado_conservacion = Column(String(255))
    dimensiones = Column(String(255))
    movimiento = Column(String(255))

    obra = relationship("Obra")
