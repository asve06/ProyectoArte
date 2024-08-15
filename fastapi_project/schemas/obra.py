from pydantic import BaseModel
from typing import Optional
from datetime import date

class ObraBase(BaseModel):
    titulo: str
    fecha_creacion: date
    autor: Optional[str] = 'Enrique Tábara'
    dimensiones: str
    categoria: str
    ubicacion: str
    tecnica: str
    movimiento: str
    estado_conservacion: str
    descripcion: str
    adicionales: Optional[str] = None
    archivo: Optional[str] = None

# Clase para crear y validar los datos al crear una obra.
class ObraCreate(ObraBase):
    pass

# Clase para representar una obra existente con su id.
class ObraRead(ObraBase):
    id: int

    class Config:
        from_attributes = True # Pydantic model_dump
