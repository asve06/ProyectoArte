from fastapi import FastAPI
from routers.obra import obra
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

# Incluir las rutas de la API
app.include_router(obra)