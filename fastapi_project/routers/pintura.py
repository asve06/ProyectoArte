from fastapi import APIRouter, Depends, HTTPException, status, Response
from sqlalchemy.orm import Session
from models.pintura import Pintura
from config.database import get_db
from schemas.pintura import PinturaCreate, PinturaRead
from starlette.status import HTTP_204_NO_CONTENT

# Crear una instancia de APIRouter
pintura = APIRouter()

# Definir las ruta get, post, get por id, delete y put
@pintura.get("/pinturas", response_model=list[PinturaRead], tags=["pinturas"])
def get_pinturas(db: Session = Depends(get_db), skip: int = 0, limit: int = 10):
    return db.query(Pintura).offset(skip).limit(limit).all()

@pintura.post("/pinturas", response_model=PinturaRead, tags=["pinturas"])
def create_pinturas(pintura: PinturaCreate, db: Session = Depends(get_db)):
    db_pintura = Pintura(**pintura.model_dump()) # Convertir a un diccionario con model_dump
    db.add(db_pintura) # Agregar a la base de datos
    db.commit() # Commit para guardar los cambios
    db.refresh(db_pintura) # Refrescar la instancia para 
    return db_pintura #Devolver la instancia creada

@pintura.get("/pinturas/{pintura_id}", response_model=PinturaRead, tags=["pinturas"])
def read_pintura(pintura_id: int, db: Session = Depends(get_db)):
    db_pintura = db.query(Pintura).filter(Pintura.id == pintura_id).first()
    if db_pintura is None:
        raise HTTPException(status_code=404, detail="Pintura not found") # Si no se encuentra la pintura, devolver un error 404
    return db_pintura # Devolver la pintura encontrada

@pintura.delete("/pinturas/{pintura_id}", status_code= status.HTTP_204_NO_CONTENT, tags=["pinturas"])
def delete_pintura(pintura_id: int, db: Session = Depends(get_db)):
    db_pintura = db.query(Pintura).filter(Pintura.id == pintura_id).first()
    if db_pintura is None:
        raise HTTPException(status_code=404, detail="Pintura not found")
    db.delete(db_pintura)
    db.commit()
    return Response(status_code=HTTP_204_NO_CONTENT)
    

@pintura.put("/pinturas/{pintura_id}", response_model=PinturaRead, tags=["pinturas"])
def update_user(pintura_id: int, pintura: PinturaCreate, db: Session = Depends(get_db)):
    db_pintura = db.query(Pintura).filter(Pintura.id == pintura_id).first()
    if db_pintura is None:
        raise HTTPException(status_code=404, detail="Pintura not found")
    # Actualizar los campos de la pintura
    for key, value in pintura.model_dump().items():
        setattr(db_pintura, key, value)
    db.commit()
    db.refresh(db_pintura)
    return db_pintura