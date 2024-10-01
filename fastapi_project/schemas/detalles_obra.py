from pydantic import BaseModel, field_validator
from typing import Optional

# Detalles de obra, con validaciones según tipo de obra
class DetallesObraBase(BaseModel):
    # Atributos de pinturas
    tecnica: Optional[str] = None
    estado_conservacion: Optional[str] = None
    dimensiones: Optional[str] = None
    movimiento: Optional[str] = None

    # Atributos de publicaciones
    editor: Optional[str] = None
    lugar_publicacion: Optional[str] = None
    generos: Optional[str] = None
    idioma: Optional[str] = None
    numero_paginas: Optional[int] = None

    # Atributos de multimedia
    tipo_multimedia: Optional[str] = None
    duracion: Optional[str] = None
    formato: Optional[str] = None

    # Validación para campos relacionados con pinturas
    @field_validator('tecnica', 'estado_conservacion', 'dimensiones', 'movimiento', mode="before")
    def validar_pintura(cls, v, values):
        if values.get('tipo_obra') == 'pintura' and v is None:
            raise ValueError('Este campo es obligatorio para pinturas.')
        return v

    # Validación para campos relacionados con publicaciones
    @field_validator('editor', 'lugar_publicacion', 'generos', 'idioma', 'numero_paginas', mode="before")
    def validar_publicacion(cls, v, values):
        if values.get('tipo_obra') == 'publicacion' and v is None:
            raise ValueError('Este campo es obligatorio para publicaciones.')
        return v

    # Validación para campos relacionados con multimedia
    @field_validator('tipo_multimedia', 'duracion', 'formato', mode="before")
    def validar_multimedia(cls, v, values):
        if values.get('tipo_obra') == 'multimedia' and v is None:
            raise ValueError('Este campo es obligatorio para multimedia.')
        return v

class DetallesObraCreate(DetallesObraBase):
    pass

class DetallesObraRead(DetallesObraBase):
    id: int

    class Config:
        from_attributes = True
