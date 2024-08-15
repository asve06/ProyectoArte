from sqlalchemy import Column, Integer, String, Text, Date
from config.database import Base

# Crear la clase Obra
class Obra(Base):
    __tablename__ = 'obras'
    
    id = Column(Integer, primary_key=True, index=True)
    titulo = Column(String(255), index=True)
    fecha_creacion = Column(Date)
    autor = Column(String(255), default='Enrique Tábara')
    dimensiones = Column(String(255))
    categoria = Column(String(255))
    ubicacion = Column(String(255))
    tecnica = Column(String(255))
    movimiento = Column(String(255))
    estado_conservacion = Column(String(255))
    descripcion = Column(Text)
    adicionales = Column(Text, nullable=True)
    archivo = Column(String, nullable=True)  # Modificado para adaptarse a SQLAlchemy