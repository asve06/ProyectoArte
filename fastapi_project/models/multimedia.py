from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from config.database import Base

class Multimedia(Base):
    __tablename__ = 'multimedia'

    id = Column(Integer, primary_key=True, index=True)
    obra_id = Column(Integer, ForeignKey('obras.id'))
    tipo = Column(String(255))

    obra = relationship("Obra")
