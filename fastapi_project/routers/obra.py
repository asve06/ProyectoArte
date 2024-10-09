from fastapi import APIRouter, Depends, HTTPException, status, Response
from sqlalchemy.orm import Session
from models.obra import Obra
from models.detalles_obra import DetallesObra
from models.autor import Autor
from models.ubicacion import Ubicacion
from config.database import get_db
from schemas.obra import ObraCreate, ObraRead
from schemas.detalles_obra import DetallesObraCreate
from starlette.status import HTTP_204_NO_CONTENT

# Crear una instancia de APIRouter
obra = APIRouter()

# Definir las ruta get, post, get por id, delete y put
@obra.get("/obras", response_model=list[ObraRead], tags=["obras"])
def get_obras(db: Session = Depends(get_db), skip: int = 0, limit: int = 10):
    db_obras = db.query(Obra).offset(skip).limit(limit).all()
    for obra in db_obras:
        obra.autor_nombre = db.query(Autor.nombre).filter(Autor.id == obra.autor_id).first()[0]
        obra.ubicacion_nombre = db.query(Ubicacion.nombre).filter(Ubicacion.id == obra.ubicacion_id).first()[0]
    return db_obras

@obra.post("/obras", response_model=ObraRead, tags=["obras"])
def create_obras(obra: ObraCreate, db: Session = Depends(get_db)):
    try:
        print("Datos de la obra:", obra.model_dump())
        db_obra = Obra(**obra.model_dump(exclude={"detalles"})) # Convertir a un diccionario con model_dump
        db.add(db_obra) # Agregar a la base de datos
        db.commit() # Commit para guardar los cambios
        db.refresh(db_obra) # Refrescar la instancia para 
        print("Hasta aqui todo bien")
        print(obra.detalles.model_dump())
        detalles_data = obra.detalles.model_dump() if obra.detalles else {}
        db_detalles = DetallesObra(**detalles_data, obra_id=db_obra.id)
        db.add(db_detalles)
        db.commit()
        db.refresh(db_detalles)
        return db_obra #Devolver la instancia creada
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=f"Error al crear la obra:{str(e)}")

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
    try:
        for key, value in obra.model_dump(exclude={"detalles"}).items():
            setattr(db_obra, key, value)
        db.commit()
        db.refresh(db_obra)
        
        detalles_data = obra.detalles.model_dump() if obra.detalles else {}
        db_detalles = db.query(DetallesObra).filter(DetallesObra.obra_id == obra_id).first()
        for key, value in detalles_data.items():
            setattr(db_detalles, key, value)
        db.commit()
        db.refresh(db_detalles)
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=f"Error al actualizar la obra:{str(e)}")
    return db_obra