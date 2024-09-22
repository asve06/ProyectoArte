from pydantic import BaseModel

# Esquema para lo solicitud de inicio de sesión
class LoginRequest(BaseModel):
    email: str
    password: str

# Esquema para la respuesta con el token JWT
class TokenResponse(BaseModel):
    access_token: str
    token_type: str
