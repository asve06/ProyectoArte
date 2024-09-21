from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from config.database import get_db
from models.usuario import Usuario
from schemas.auth import LoginRequest, TokenResponse
from jose import JWTError, jwt  # Librerías para manejar JWT
from datetime import datetime, timedelta, timezone

# Configuración del cifrado de contraseñas
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Definir los detalles de la generación del JWT
SECRET_KEY = "mysecretkey"  # Clave secreta para firmar los tokens (cámbiala en producción)
ALGORITHM = "HS256"  # Algoritmo de cifrado para el JWT
ACCESS_TOKEN_EXPIRE_MINUTES = 30  # Duración del token

auth = APIRouter()

def create_access_token(data: dict):
    """Función para crear un token de acceso JWT"""
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

@auth.post("/login", response_model=TokenResponse)
def login(request: LoginRequest, db: Session = Depends(get_db)):
    """Endpoint para manejar el inicio de sesión de los usuarios"""
    # Buscar al usuario en la base de datos
    user = db.query(Usuario).filter(Usuario.email == request.email).first()
    
    # Verificar si el usuario existe y si la contraseña es correcta
    if user and pwd_context.verify(request.password, user.password_hash):
        # Crear el token JWT con la información del usuario
        access_token = create_access_token(data={"sub": user.email, "rol": user.rol.value})
        return {"access_token": access_token, "token_type": "bearer"}
    
    # Si las credenciales son inválidas, lanzar una excepción
    raise HTTPException(status_code=401, detail="Credenciales inválidas")
