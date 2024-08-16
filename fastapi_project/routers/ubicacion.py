from fastapi import APIRouter, Depends, HTTPException, status, Response
from sqlalchemy.orm import Session
from models.ubicacion import Ubicacion
from config.database import get_db
from schemas.ubicacion import UbicacionCreate, UbicacionRead
from starlette.status import HTTP_204_NO_CONTENT

# Crear una instancia de APIRouter
ubicacion = APIRouter()

# Definir las ruta get, post, get por id, delete y put
@ubicacion.get("/ubicacions", response_model=list[UbicacionRead], tags=["ubicacions"])
def get_ubicacions(db: Session = Depends(get_db), skip: int = 0, limit: int = 10):
    return db.query(Ubicacion).offset(skip).limit(limit).all()

@ubicacion.post("/ubicacions", response_model=UbicacionRead, tags=["ubicacions"])
def create_ubicacions(ubicacion: UbicacionCreate, db: Session = Depends(get_db)):
    db_ubicacion = Ubicacion(**ubicacion.model_dump()) # Convertir a un diccionario con model_dump
    db.add(db_ubicacion) # Agregar a la base de datos
    db.commit() # Commit para guardar los cambios
    db.refresh(db_ubicacion) # Refrescar la instancia para 
    return db_ubicacion #Devolver la instancia creada

@ubicacion.get("/ubicacions/{ubicacion_id}", response_model=UbicacionRead, tags=["ubicacions"])
def read_ubicacion(ubicacion_id: int, db: Session = Depends(get_db)):
    db_ubicacion = db.query(Ubicacion).filter(Ubicacion.id == ubicacion_id).first()
    if db_ubicacion is None:
        raise HTTPException(status_code=404, detail="Ubicacion not found") # Si no se encuentra la ubicacion, devolver un error 404
    return db_ubicacion # Devolver la ubicacion encontrada

@ubicacion.delete("/ubicacions/{ubicacion_id}", status_code= status.HTTP_204_NO_CONTENT, tags=["ubicacions"])
def delete_ubicacion(ubicacion_id: int, db: Session = Depends(get_db)):
    db_ubicacion = db.query(Ubicacion).filter(Ubicacion.id == ubicacion_id).first()
    if db_ubicacion is None:
        raise HTTPException(status_code=404, detail="Ubicacion not found")
    db.delete(db_ubicacion)
    db.commit()
    return Response(status_code=HTTP_204_NO_CONTENT)
    

@ubicacion.put("/ubicacions/{ubicacion_id}", response_model=UbicacionRead, tags=["ubicacions"])
def update_user(ubicacion_id: int, ubicacion: UbicacionCreate, db: Session = Depends(get_db)):
    db_ubicacion = db.query(Ubicacion).filter(Ubicacion.id == ubicacion_id).first()
    if db_ubicacion is None:
        raise HTTPException(status_code=404, detail="Ubicacion not found")
    # Actualizar los campos de la ubicacion
    for key, value in ubicacion.model_dump().items():
        setattr(db_ubicacion, key, value)
    db.commit()
    db.refresh(db_ubicacion)
    return db_ubicacion