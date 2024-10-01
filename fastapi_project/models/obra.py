from sqlalchemy import Column, Integer, String, Text, Date, JSON, ForeignKey, Enum
from sqlalchemy.orm import relationship
from config.database import Base
import enum
from .detalles_obra import DetallesObra
 
class TipoEnum(enum.Enum):
    pintura = "pintura"
    publicacion = "publicacion"
    multimedia = "multimedia"

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
    tipo_obra = Column(Enum(TipoEnum), nullable=False)
    
    detalles = relationship("DetallesObra", back_populates="obra", uselist=False)
    autor = relationship("Autor")
    ubicacion = relationship("Ubicacion")
