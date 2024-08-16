from sqlalchemy import Column, Integer, String
from config.database import Base

class Tecnica(Base):
    __tablename__ = 'tecnicas'

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(255), nullable=False, unique=True)
