from sqlalchemy import Column, Integer, String
from config.database import Base

class Categoria(Base):
    __tablename__ = 'categorias'

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(255), nullable=False, unique=True)
