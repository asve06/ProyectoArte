from sqlalchemy import Column, Integer, String, Text, Date, JSON, ForeignKey
from sqlalchemy.orm import relationship
from config.database import Base

class Obra(Base):
    __tablename__ = 'obras'

    id = Column(Integer, primary_key=True, index=True)
    titulo = Column(String(255), nullable=False)
    descripcion = Column(Text)
    autor_id = Column(Integer, ForeignKey('autores.id'))
    fecha_creacion = Column(Date, nullable=False)
    ubicacion_id = Column(Integer, ForeignKey('ubicaciones.id'))
    palabras_clave = Column(Text)
    url_imagen = Column(String(255))
    adicionales = Column(JSON)
    
    autor = relationship("Autor")
    ubicacion = relationship("Ubicacion")
