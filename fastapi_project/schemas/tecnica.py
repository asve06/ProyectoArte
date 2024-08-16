from pydantic import BaseModel

class TecnicaBase(BaseModel):
    nombre: str

class TecnicaCreate(TecnicaBase):
    pass

class TecnicaRead(TecnicaBase):
    id: int

    class Config:
        from_attributes = True
