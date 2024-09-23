from pydantic import BaseModel

class AutorBase(BaseModel):
    nombre: str


# Clase para crear y validar los datos al crear un autor.
class AutorCreate(AutorBase):
    pass

# Clase para representar un autor existente con su id.
class AutorRead(AutorBase):
    id: int

    class Config:
        from_attributes = True # Pydantic model_dump
