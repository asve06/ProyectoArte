from pydantic import BaseModel

class MovimientoBase(BaseModel):
    nombre: str

class MovimientoCreate(MovimientoBase):
    pass

class MovimientoRead(MovimientoBase):
    id: int

    class Config:
        from_attributes = True
