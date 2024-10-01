from pydantic import BaseModel
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
    autor_nombre: Optional[str] = None
    fecha_creacion: date
    ubicacion_nombre: Optional[str] = None
    palabras_clave: Optional[str]
    url_imagen: Optional[str]
    adicionales: Optional[dict] = None
    tipo_obra: TipoEnum

class ObraCreate(ObraBase):
    pass

class ObraRead(ObraBase):
    id: int

    class Config:
        from_attributes = True
