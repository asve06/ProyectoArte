from pydantic import BaseModel
from typing import Optional

class PinturaBase(BaseModel):
    obra_id: int
    tecnica: Optional[str]
    estado_conservacion: Optional[str]
    dimensiones: Optional[str]
    movimiento: Optional[str]

class PinturaCreate(PinturaBase):
    pass

class PinturaRead(PinturaBase):
    id: int

    class Config:
        from_attributes = True
