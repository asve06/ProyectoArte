from fastapi import APIRouter, Depends, HTTPException, status, Response
from sqlalchemy.orm import Session
from models.usuario import Usuario
from config.database import get_db
from schemas.usuario import UsuarioCreate, UsuarioRead
from starlette.status import HTTP_204_NO_CONTENT
import bcrypt

# Crear una instancia de APIRouter
usuario = APIRouter()

# Definir las ruta get, post, get por id, delete y put
@usuario.get("/usuarios", response_model=list[UsuarioRead], tags=["usuarios"])
def get_usuarios(db: Session = Depends(get_db), skip: int = 0, limit: int = 10):
    return db.query(Usuario).offset(skip).limit(limit).all()

@usuario.post("/usuarios", response_model=UsuarioRead, tags=["usuarios"])
def create_usuarios(usuario: UsuarioCreate, db: Session = Depends(get_db)):
    hashed_password = bcrypt.hashpw(usuario.password_hash.encode('utf-8'), bcrypt.gensalt())
    #Crear el usuario con la contraseña hasheada
    db_usuario = Usuario(
        nombre=usuario.nombre,
        email=usuario.email,
        rol=usuario.rol,
        password_hash=hashed_password.decode('utf-8') # Convertir Bytes a String
    )
    db.add(db_usuario) # Agregar a la base de datos
    db.commit() # Commit para guardar los cambios
    db.refresh(db_usuario) # Refrescar la instancia para 
    return db_usuario #Devolver la instancia creada

@usuario.get("/usuarios/{usuario_id}", response_model=UsuarioRead, tags=["usuarios"])
def read_usuario(usuario_id: int, db: Session = Depends(get_db)):
    db_usuario = db.query(Usuario).filter(Usuario.id == usuario_id).first()
    if db_usuario is None:
        raise HTTPException(status_code=404, detail="Usuario not found") # Si no se encuentra la usuario, devolver un error 404
    return db_usuario # Devolver la usuario encontrada

@usuario.delete("/usuarios/{usuario_id}", status_code= status.HTTP_204_NO_CONTENT, tags=["usuarios"])
def delete_usuario(usuario_id: int, db: Session = Depends(get_db)):
    db_usuario = db.query(Usuario).filter(Usuario.id == usuario_id).first()
    if db_usuario is None:
        raise HTTPException(status_code=404, detail="Usuario not found")
    db.delete(db_usuario)
    db.commit()
    return Response(status_code=HTTP_204_NO_CONTENT)
    

@usuario.put("/usuarios/{usuario_id}", response_model=UsuarioRead, tags=["usuarios"])
def update_user(usuario_id: int, usuario: UsuarioCreate, db: Session = Depends(get_db)):
    db_usuario = db.query(Usuario).filter(Usuario.id == usuario_id).first()
    if db_usuario is None:
        raise HTTPException(status_code=404, detail="Usuario not found")
    # Actualizar los campos de la usuario
    for key, value in usuario.model_dump().items():
        setattr(db_usuario, key, value)
    db.commit()
    db.refresh(db_usuario)
    return db_usuario