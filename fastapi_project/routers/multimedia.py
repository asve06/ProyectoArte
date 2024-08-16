from fastapi import APIRouter, Depends, HTTPException, status, Response
from sqlalchemy.orm import Session
from models.multimedia import Multimedia
from config.database import get_db
from schemas.multimedia import MultimediaCreate, MultimediaRead
from starlette.status import HTTP_204_NO_CONTENT

# Crear una instancia de APIRouter
multimedia = APIRouter()

# Definir las ruta get, post, get por id, delete y put
@multimedia.get("/multimedias", response_model=list[MultimediaRead], tags=["multimedias"])
def get_multimedias(db: Session = Depends(get_db), skip: int = 0, limit: int = 10):
    return db.query(Multimedia).offset(skip).limit(limit).all()

@multimedia.post("/multimedias", response_model=MultimediaRead, tags=["multimedias"])
def create_multimedias(multimedia: MultimediaCreate, db: Session = Depends(get_db)):
    db_multimedia = Multimedia(**multimedia.model_dump()) # Convertir a un diccionario con model_dump
    db.add(db_multimedia) # Agregar a la base de datos
    db.commit() # Commit para guardar los cambios
    db.refresh(db_multimedia) # Refrescar la instancia para 
    return db_multimedia #Devolver la instancia creada

@multimedia.get("/multimedias/{multimedia_id}", response_model=MultimediaRead, tags=["multimedias"])
def read_multimedia(multimedia_id: int, db: Session = Depends(get_db)):
    db_multimedia = db.query(Multimedia).filter(Multimedia.id == multimedia_id).first()
    if db_multimedia is None:
        raise HTTPException(status_code=404, detail="Multimedia not found") # Si no se encuentra la multimedia, devolver un error 404
    return db_multimedia # Devolver la multimedia encontrada

@multimedia.delete("/multimedias/{multimedia_id}", status_code= status.HTTP_204_NO_CONTENT, tags=["multimedias"])
def delete_multimedia(multimedia_id: int, db: Session = Depends(get_db)):
    db_multimedia = db.query(Multimedia).filter(Multimedia.id == multimedia_id).first()
    if db_multimedia is None:
        raise HTTPException(status_code=404, detail="Multimedia not found")
    db.delete(db_multimedia)
    db.commit()
    return Response(status_code=HTTP_204_NO_CONTENT)
    

@multimedia.put("/multimedias/{multimedia_id}", response_model=MultimediaRead, tags=["multimedias"])
def update_user(multimedia_id: int, multimedia: MultimediaCreate, db: Session = Depends(get_db)):
    db_multimedia = db.query(Multimedia).filter(Multimedia.id == multimedia_id).first()
    if db_multimedia is None:
        raise HTTPException(status_code=404, detail="Multimedia not found")
    # Actualizar los campos de la multimedia
    for key, value in multimedia.model_dump().items():
        setattr(db_multimedia, key, value)
    db.commit()
    db.refresh(db_multimedia)
    return db_multimedia