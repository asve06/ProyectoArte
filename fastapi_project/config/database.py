from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

#DATABASE_URL = "postgresql://postgres:2318@localhost:5432/ObrasArte"
DATABASE_URL = "postgresql://asve:asdf@localhost:5432/ObrasArte"

# Crear una instancia del motor de base de datos
engine = create_engine(DATABASE_URL)
# Fábrica de sesiones no hacer autocommit ni autoflush
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
# Clase base para las clases de base de datos
Base = declarative_base()

# Función para obtener una sesión de la base de datos
def get_db():
  db = SessionLocal()
  try:
    yield db
  finally:
    db.close()