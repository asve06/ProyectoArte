from fastapi import APIRouter, Depends, HTTPException, status, Response
from sqlalchemy.orm import Session
from models.categoria import Categoria
from config.database import get_db
from schemas.categoria import CategoriaCreate, CategoriaRead
from starlette.status import HTTP_204_NO_CONTENT

# Crear una instancia de APIRouter
categoria = APIRouter()

# Definir las ruta get, post, get por id, delete y put
@categoria.get("/categorias", response_model=list[CategoriaRead], tags=["categorias"])
def get_categorias(db: Session = Depends(get_db), skip: int = 0, limit: int = 10):
    return db.query(Categoria).offset(skip).limit(limit).all()

@categoria.post("/categorias", response_model=CategoriaRead, tags=["categorias"])
def create_categorias(categoria: CategoriaCreate, db: Session = Depends(get_db)):
    db_categoria = Categoria(**categoria.model_dump()) # Convertir a un diccionario con model_dump
    db.add(db_categoria) # Agregar a la base de datos
    db.commit() # Commit para guardar los cambios
    db.refresh(db_categoria) # Refrescar la instancia para 
    return db_categoria #Devolver la instancia creada

@categoria.get("/categorias/{categoria_id}", response_model=CategoriaRead, tags=["categorias"])
def read_categoria(categoria_id: int, db: Session = Depends(get_db)):
    db_categoria = db.query(Categoria).filter(Categoria.id == categoria_id).first()
    if db_categoria is None:
        raise HTTPException(status_code=404, detail="Categoria not found") # Si no se encuentra la categoria, devolver un error 404
    return db_categoria # Devolver la categoria encontrada

@categoria.delete("/categorias/{categoria_id}", status_code= status.HTTP_204_NO_CONTENT, tags=["categorias"])
def delete_categoria(categoria_id: int, db: Session = Depends(get_db)):
    db_categoria = db.query(Categoria).filter(Categoria.id == categoria_id).first()
    if db_categoria is None:
        raise HTTPException(status_code=404, detail="Categoria not found")
    db.delete(db_categoria)
    db.commit()
    return Response(status_code=HTTP_204_NO_CONTENT)
    

@categoria.put("/categorias/{categoria_id}", response_model=CategoriaRead, tags=["categorias"])
def update_user(categoria_id: int, categoria: CategoriaCreate, db: Session = Depends(get_db)):
    db_categoria = db.query(Categoria).filter(Categoria.id == categoria_id).first()
    if db_categoria is None:
        raise HTTPException(status_code=404, detail="Categoria not found")
    # Actualizar los campos de la categoria
    for key, value in categoria.model_dump().items():
        setattr(db_categoria, key, value)
    db.commit()
    db.refresh(db_categoria)
    return db_categoria