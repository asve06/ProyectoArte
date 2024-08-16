from fastapi import APIRouter, Depends, HTTPException, status, Response
from sqlalchemy.orm import Session
from models.movimiento import Movimiento
from config.database import get_db
from schemas.movimiento import MovimientoCreate, MovimientoRead
from starlette.status import HTTP_204_NO_CONTENT

# Crear una instancia de APIRouter
movimiento = APIRouter()

# Definir las ruta get, post, get por id, delete y put
@movimiento.get("/movimientos", response_model=list[MovimientoRead], tags=["movimientos"])
def get_movimientos(db: Session = Depends(get_db), skip: int = 0, limit: int = 10):
    return db.query(Movimiento).offset(skip).limit(limit).all()

@movimiento.post("/movimientos", response_model=MovimientoRead, tags=["movimientos"])
def create_movimientos(movimiento: MovimientoCreate, db: Session = Depends(get_db)):
    db_movimiento = Movimiento(**movimiento.model_dump()) # Convertir a un diccionario con model_dump
    db.add(db_movimiento) # Agregar a la base de datos
    db.commit() # Commit para guardar los cambios
    db.refresh(db_movimiento) # Refrescar la instancia para 
    return db_movimiento #Devolver la instancia creada

@movimiento.get("/movimientos/{movimiento_id}", response_model=MovimientoRead, tags=["movimientos"])
def read_movimiento(movimiento_id: int, db: Session = Depends(get_db)):
    db_movimiento = db.query(Movimiento).filter(Movimiento.id == movimiento_id).first()
    if db_movimiento is None:
        raise HTTPException(status_code=404, detail="Movimiento not found") # Si no se encuentra la movimiento, devolver un error 404
    return db_movimiento # Devolver la movimiento encontrada

@movimiento.delete("/movimientos/{movimiento_id}", status_code= status.HTTP_204_NO_CONTENT, tags=["movimientos"])
def delete_movimiento(movimiento_id: int, db: Session = Depends(get_db)):
    db_movimiento = db.query(Movimiento).filter(Movimiento.id == movimiento_id).first()
    if db_movimiento is None:
        raise HTTPException(status_code=404, detail="Movimiento not found")
    db.delete(db_movimiento)
    db.commit()
    return Response(status_code=HTTP_204_NO_CONTENT)
    

@movimiento.put("/movimientos/{movimiento_id}", response_model=MovimientoRead, tags=["movimientos"])
def update_user(movimiento_id: int, movimiento: MovimientoCreate, db: Session = Depends(get_db)):
    db_movimiento = db.query(Movimiento).filter(Movimiento.id == movimiento_id).first()
    if db_movimiento is None:
        raise HTTPException(status_code=404, detail="Movimiento not found")
    # Actualizar los campos de la movimiento
    for key, value in movimiento.model_dump().items():
        setattr(db_movimiento, key, value)
    db.commit()
    db.refresh(db_movimiento)
    return db_movimiento