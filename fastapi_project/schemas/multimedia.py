from pydantic import BaseModel

class MultimediaBase(BaseModel):
    obra_id: int
    tipo: str

class MultimediaCreate(MultimediaBase):
    pass

class MultimediaRead(MultimediaBase):
    id: int

    class Config:
        from_attributes = True
