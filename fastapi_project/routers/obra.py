from fastapi import APIRouter, Depends, HTTPException, status, Response
from sqlalchemy.orm import Session
from models.obra import Obra
from config.database import get_db
from schemas.obra import ObraCreate, ObraRead
from starlette.status import HTTP_204_NO_CONTENT

# Crear una instancia de APIRouter
obra = APIRouter()

# Definir las ruta get, post, get por id, delete y put
@obra.get("/obras", response_model=list[ObraRead], tags=["obras"])
def get_obras(db: Session = Depends(get_db), skip: int = 0, limit: int = 10):
    return db.query(Obra).offset(skip).limit(limit).all()

@obra.post("/obras", response_model=ObraRead, tags=["obras"])
def create_obras(obra: ObraCreate, db: Session = Depends(get_db)):
    db_obra = Obra(**obra.model_dump()) # Convertir a un diccionario con model_dump
    db.add(db_obra) # Agregar a la base de datos
    db.commit() # Commit para guardar los cambios
    db.refresh(db_obra) # Refrescar la instancia para 
    return db_obra #Devolver la instancia creada

@obra.get("/obras/{obra_id}", response_model=ObraRead, tags=["obras"])
def read_obra(obra_id: int, db: Session = Depends(get_db)):
    db_obra = db.query(Obra).filter(Obra.id == obra_id).first()
    if db_obra is None:
        raise HTTPException(status_code=404, detail="Obra not found") # Si no se encuentra la obra, devolver un error 404
    return db_obra # Devolver la obra encontrada

@obra.delete("/obras/{obra_id}", status_code= status.HTTP_204_NO_CONTENT, tags=["obras"])
def delete_obra(obra_id: int, db: Session = Depends(get_db)):
    db_obra = db.query(Obra).filter(Obra.id == obra_id).first()
    if db_obra is None:
        raise HTTPException(status_code=404, detail="Obra not found")
    db.delete(db_obra)
    db.commit()
    return Response(status_code=HTTP_204_NO_CONTENT)
    

@obra.put("/obras/{obra_id}", response_model=ObraRead, tags=["obras"])
def update_user(obra_id: int, obra: ObraCreate, db: Session = Depends(get_db)):
    db_obra = db.query(Obra).filter(Obra.id == obra_id).first()
    if db_obra is None:
        raise HTTPException(status_code=404, detail="Obra not found")
    # Actualizar los campos de la obra
    for key, value in obra.model_dump().items():
        setattr(db_obra, key, value)
    db.commit()
    db.refresh(db_obra)
    return db_obra