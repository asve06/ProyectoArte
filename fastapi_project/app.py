from fastapi import FastAPI
from routers import autor, categoria, movimiento, newsletter, obra, tecnica, ubicacion, usuario
from routers.auth import auth
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles


app = FastAPI()

# Configurar el CORS
origins = [
    "http://localhost:5173",
]

# Añadir el middleware CORS a la aplicación
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Permitir todos los métodos HTTP (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Permitir todos los encabezados
)

# Crear las tablas en la base de datos solo una vez
#Base.metadata.create_all(bind=engine)

# Monta la carpeta "Obras" como archivos estáticos
app.mount("/static", StaticFiles(directory="static"), name="static")

# Incluir todas las rutas
app.include_router(autor)
app.include_router(categoria)
app.include_router(movimiento)
app.include_router(newsletter)
app.include_router(obra)
app.include_router(tecnica)
app.include_router(ubicacion)
app.include_router(usuario)
app.include_router(auth)