from fastapi import APIRouter, Depends, HTTPException, status, Response
from sqlalchemy.orm import Session
from models.tecnica import Tecnica
from config.database import get_db
from schemas.tecnica import TecnicaCreate, TecnicaRead
from starlette.status import HTTP_204_NO_CONTENT

# Crear una instancia de APIRouter
tecnica = APIRouter()

# Definir las ruta get, post, get por id, delete y put
@tecnica.get("/tecnicas", response_model=list[TecnicaRead], tags=["tecnicas"])
def get_tecnicas(db: Session = Depends(get_db), skip: int = 0, limit: int = 10):
    return db.query(Tecnica).offset(skip).limit(limit).all()

@tecnica.post("/tecnicas", response_model=TecnicaRead, tags=["tecnicas"])
def create_tecnicas(tecnica: TecnicaCreate, db: Session = Depends(get_db)):
    db_tecnica = Tecnica(**tecnica.model_dump()) # Convertir a un diccionario con model_dump
    db.add(db_tecnica) # Agregar a la base de datos
    db.commit() # Commit para guardar los cambios
    db.refresh(db_tecnica) # Refrescar la instancia para 
    return db_tecnica #Devolver la instancia creada

@tecnica.get("/tecnicas/{tecnica_id}", response_model=TecnicaRead, tags=["tecnicas"])
def read_tecnica(tecnica_id: int, db: Session = Depends(get_db)):
    db_tecnica = db.query(Tecnica).filter(Tecnica.id == tecnica_id).first()
    if db_tecnica is None:
        raise HTTPException(status_code=404, detail="Tecnica not found") # Si no se encuentra la tecnica, devolver un error 404
    return db_tecnica # Devolver la tecnica encontrada

@tecnica.delete("/tecnicas/{tecnica_id}", status_code= status.HTTP_204_NO_CONTENT, tags=["tecnicas"])
def delete_tecnica(tecnica_id: int, db: Session = Depends(get_db)):
    db_tecnica = db.query(Tecnica).filter(Tecnica.id == tecnica_id).first()
    if db_tecnica is None:
        raise HTTPException(status_code=404, detail="Tecnica not found")
    db.delete(db_tecnica)
    db.commit()
    return Response(status_code=HTTP_204_NO_CONTENT)
    

@tecnica.put("/tecnicas/{tecnica_id}", response_model=TecnicaRead, tags=["tecnicas"])
def update_user(tecnica_id: int, tecnica: TecnicaCreate, db: Session = Depends(get_db)):
    db_tecnica = db.query(Tecnica).filter(Tecnica.id == tecnica_id).first()
    if db_tecnica is None:
        raise HTTPException(status_code=404, detail="Tecnica not found")
    # Actualizar los campos de la tecnica
    for key, value in tecnica.model_dump().items():
        setattr(db_tecnica, key, value)
    db.commit()
    db.refresh(db_tecnica)
    return db_tecnica