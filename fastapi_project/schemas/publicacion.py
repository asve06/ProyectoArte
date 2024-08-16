from pydantic import BaseModel
from typing import Optional

class PublicacionBase(BaseModel):
    obra_id: int
    editor: Optional[str] = None
    lugar_publicacion: Optional[str] = None
    generos: Optional[str]
    idioma: Optional[str]
    numero_paginas: Optional[int] = None

class PublicacionCreate(PublicacionBase):
    pass

class PublicacionRead(PublicacionBase):
    id: int

    class Config:
        from_attributes = True
