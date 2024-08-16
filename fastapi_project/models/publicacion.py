from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship
from config.database import Base

class Publicacion(Base):
    __tablename__ = 'publicaciones'

    id = Column(Integer, primary_key=True, index=True)
    obra_id = Column(Integer, ForeignKey('obras.id'))
    editor = Column(String(255))
    lugar_publicacion = Column(String(255))
    generos = Column(Text)
    idioma = Column(String(50))
    numero_paginas = Column(Integer)

    obra = relationship("Obra")