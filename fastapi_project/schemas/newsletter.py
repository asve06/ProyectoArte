from pydantic import BaseModel
from datetime import datetime

class NewsletterBase(BaseModel):
    usuario_id: int
    suscrito: bool = True

class NewsletterCreate(NewsletterBase):
    pass

class NewsletterRead(NewsletterBase):
    id: int
    fecha_suscripcion: datetime

    class Config:
        from_attributes = True
