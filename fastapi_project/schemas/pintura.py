from pydantic import BaseModel
from typing import Optional

class PinturaBase(BaseModel):
    obra_id: int
    tecnica_id: int
    estado_conservacion: Optional[str]
    dimensiones: Optional[str]
    movimiento_id: int

class PinturaCreate(PinturaBase):
    pass

class PinturaRead(PinturaBase):
    id: int

    class Config:
        from_attributes = True
