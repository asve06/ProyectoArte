from pydantic import BaseModel
from .detalles_obra import DetallesObraCreate
from typing import Optional, List
from datetime import date
from enum import Enum

class TipoEnum(str, Enum):
    pintura = "pintura"
    publicacion = "publicacion"
    multimedia = "multimedia"
    
class ObraBase(BaseModel):
    titulo: str
    descripcion: Optional[str]
    autor_id: Optional[int] = None
    fecha_creacion: date
    ubicacion_id: Optional[int] = None
    palabras_clave: Optional[str]
    url_imagen: Optional[str]
    adicionales: Optional[dict] = None
    tipo_obra: TipoEnum
    detalles: Optional[DetallesObraCreate]

class ObraCreate(ObraBase):
    pass

class ObraRead(ObraBase):
    id: int

    class Config:
        from_attributes = True
