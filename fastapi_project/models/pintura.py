from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from config.database import Base

class Pintura(Base):
    __tablename__ = 'pinturas'

    id = Column(Integer, primary_key=True, index=True)
    obra_id = Column(Integer, ForeignKey('obras.id'))
    tecnica_id = Column(Integer, ForeignKey('tecnicas.id'))
    estado_conservacion = Column(String(255))
    dimensiones = Column(String(255))
    movimiento_id = Column(Integer, ForeignKey('movimientos.id'))

    obra = relationship("Obra")
    tecnica = relationship("Tecnica")
    movimiento = relationship("Movimiento")
