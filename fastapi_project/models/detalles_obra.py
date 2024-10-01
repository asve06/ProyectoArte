from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from config.database import Base

class DetallesObra(Base):
    __tablename__ = "detalles_obras"

    id = Column(Integer, primary_key=True, index=True)
    obra_id = Column(Integer, ForeignKey('obras.id', ondelete="CASCADE"), nullable=False, unique=True)
    
    # Atributos de pinturas
    tecnica = Column(String(255), nullable=True)  
    estado_conservacion = Column(String(255), nullable=True)
    dimensiones = Column(String(255), nullable=True)
    movimiento = Column(String(255), nullable=True)

    # Atributos de publicaciones
    editor = Column(String(255), nullable=True)
    lugar_publicacion = Column(String(255), nullable=True)
    generos = Column(String(255), nullable=True)
    idioma = Column(String(50), nullable=True)
    numero_paginas = Column(Integer, nullable=True)

    # Atributos de multimedia
    tipo_multimedia = Column(String(255), nullable=True)
    duracion = Column(String(255), nullable=True)
    formato = Column(String(255), nullable=True)

    obra = relationship("Obra", back_populates="detalles")
