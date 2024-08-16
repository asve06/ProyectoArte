from fastapi import APIRouter, Depends, HTTPException, status, Response
from sqlalchemy.orm import Session
from models.publicacion import Publicacion
from config.database import get_db
from schemas.publicacion import PublicacionCreate, PublicacionRead
from starlette.status import HTTP_204_NO_CONTENT

# Crear una instancia de APIRouter
publicacion = APIRouter()

# Definir las ruta get, post, get por id, delete y put
@publicacion.get("/publicacions", response_model=list[PublicacionRead], tags=["publicacions"])
def get_publicacions(db: Session = Depends(get_db), skip: int = 0, limit: int = 10):
    return db.query(Publicacion).offset(skip).limit(limit).all()

@publicacion.post("/publicacions", response_model=PublicacionRead, tags=["publicacions"])
def create_publicacions(publicacion: PublicacionCreate, db: Session = Depends(get_db)):
    db_publicacion = Publicacion(**publicacion.model_dump()) # Convertir a un diccionario con model_dump
    db.add(db_publicacion) # Agregar a la base de datos
    db.commit() # Commit para guardar los cambios
    db.refresh(db_publicacion) # Refrescar la instancia para 
    return db_publicacion #Devolver la instancia creada

@publicacion.get("/publicacions/{publicacion_id}", response_model=PublicacionRead, tags=["publicacions"])
def read_publicacion(publicacion_id: int, db: Session = Depends(get_db)):
    db_publicacion = db.query(Publicacion).filter(Publicacion.id == publicacion_id).first()
    if db_publicacion is None:
        raise HTTPException(status_code=404, detail="Publicacion not found") # Si no se encuentra la publicacion, devolver un error 404
    return db_publicacion # Devolver la publicacion encontrada

@publicacion.delete("/publicacions/{publicacion_id}", status_code= status.HTTP_204_NO_CONTENT, tags=["publicacions"])
def delete_publicacion(publicacion_id: int, db: Session = Depends(get_db)):
    db_publicacion = db.query(Publicacion).filter(Publicacion.id == publicacion_id).first()
    if db_publicacion is None:
        raise HTTPException(status_code=404, detail="Publicacion not found")
    db.delete(db_publicacion)
    db.commit()
    return Response(status_code=HTTP_204_NO_CONTENT)
    

@publicacion.put("/publicacions/{publicacion_id}", response_model=PublicacionRead, tags=["publicacions"])
def update_user(publicacion_id: int, publicacion: PublicacionCreate, db: Session = Depends(get_db)):
    db_publicacion = db.query(Publicacion).filter(Publicacion.id == publicacion_id).first()
    if db_publicacion is None:
        raise HTTPException(status_code=404, detail="Publicacion not found")
    # Actualizar los campos de la publicacion
    for key, value in publicacion.model_dump().items():
        setattr(db_publicacion, key, value)
    db.commit()
    db.refresh(db_publicacion)
    return db_publicacion