from fastapi import APIRouter, Depends, HTTPException, status, Response
from sqlalchemy.orm import Session
from models.autor import Autor
from config.database import get_db
from schemas.autor import AutorCreate, AutorRead
from starlette.status import HTTP_204_NO_CONTENT

# Crear una instancia de APIRouter
autor = APIRouter()

# Definir las ruta get, post, get por id, delete y put
@autor.get("/autores", response_model=list[AutorRead], tags=["autores"])
def get_autores(db: Session = Depends(get_db), skip: int = 0, limit: int = 10):
    return db.query(Autor).offset(skip).limit(limit).all()

@autor.post("/autores", response_model=AutorRead, tags=["autores"])
def create_autores(autor: AutorCreate, db: Session = Depends(get_db)):
    db_autor = Autor(**autor.model_dump()) # Convertir a un diccionario con model_dump
    db.add(db_autor) # Agregar a la base de datos
    db.commit() # Commit para guardar los cambios
    db.refresh(db_autor) # Refrescar la instancia para 
    return db_autor #Devolver la instancia creada

@autor.get("/autores/{autor_id}", response_model=AutorRead, tags=["autores"])
def read_autor(autor_id: int, db: Session = Depends(get_db)):
    db_autor = db.query(Autor).filter(Autor.id == autor_id).first()
    if db_autor is None:
        raise HTTPException(status_code=404, detail="Autor not found") # Si no se encuentra la autor, devolver un error 404
    return db_autor # Devolver la autor encontrada

@autor.delete("/autores/{autor_id}", status_code= status.HTTP_204_NO_CONTENT, tags=["autores"])
def delete_autor(autor_id: int, db: Session = Depends(get_db)):
    db_autor = db.query(Autor).filter(Autor.id == autor_id).first()
    if db_autor is None:
        raise HTTPException(status_code=404, detail="Autor not found")
    db.delete(db_autor)
    db.commit()
    return Response(status_code=HTTP_204_NO_CONTENT)
    

@autor.put("/autores/{autor_id}", response_model=AutorRead, tags=["autores"])
def update_user(autor_id: int, autor: AutorCreate, db: Session = Depends(get_db)):
    db_autor = db.query(Autor).filter(Autor.id == autor_id).first()
    if db_autor is None:
        raise HTTPException(status_code=404, detail="Autor not found")
    # Actualizar los campos de la autor
    for key, value in autor.model_dump().items():
        setattr(db_autor, key, value)
    db.commit()
    db.refresh(db_autor)
    return db_autor