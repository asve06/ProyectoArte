from fastapi import APIRouter, Depends, HTTPException, status, Response
from sqlalchemy.orm import Session
from models.newsletter import Newsletter
from config.database import get_db
from schemas.newsletter import NewsletterCreate, NewsletterRead
from starlette.status import HTTP_204_NO_CONTENT

# Crear una instancia de APIRouter
newsletter = APIRouter()

# Definir las ruta get, post, get por id, delete y put
@newsletter.get("/newsletters", response_model=list[NewsletterRead], tags=["newsletters"])
def get_newsletters(db: Session = Depends(get_db), skip: int = 0, limit: int = 10):
    return db.query(Newsletter).offset(skip).limit(limit).all()

@newsletter.post("/newsletters", response_model=NewsletterRead, tags=["newsletters"])
def create_newsletters(newsletter: NewsletterCreate, db: Session = Depends(get_db)):
    db_newsletter = Newsletter(**newsletter.model_dump()) # Convertir a un diccionario con model_dump
    db.add(db_newsletter) # Agregar a la base de datos
    db.commit() # Commit para guardar los cambios
    db.refresh(db_newsletter) # Refrescar la instancia para 
    return db_newsletter #Devolver la instancia creada

@newsletter.get("/newsletters/{newsletter_id}", response_model=NewsletterRead, tags=["newsletters"])
def read_newsletter(newsletter_id: int, db: Session = Depends(get_db)):
    db_newsletter = db.query(Newsletter).filter(Newsletter.id == newsletter_id).first()
    if db_newsletter is None:
        raise HTTPException(status_code=404, detail="Newsletter not found") # Si no se encuentra la newsletter, devolver un error 404
    return db_newsletter # Devolver la newsletter encontrada

@newsletter.delete("/newsletters/{newsletter_id}", status_code= status.HTTP_204_NO_CONTENT, tags=["newsletters"])
def delete_newsletter(newsletter_id: int, db: Session = Depends(get_db)):
    db_newsletter = db.query(Newsletter).filter(Newsletter.id == newsletter_id).first()
    if db_newsletter is None:
        raise HTTPException(status_code=404, detail="Newsletter not found")
    db.delete(db_newsletter)
    db.commit()
    return Response(status_code=HTTP_204_NO_CONTENT)
    

@newsletter.put("/newsletters/{newsletter_id}", response_model=NewsletterRead, tags=["newsletters"])
def update_user(newsletter_id: int, newsletter: NewsletterCreate, db: Session = Depends(get_db)):
    db_newsletter = db.query(Newsletter).filter(Newsletter.id == newsletter_id).first()
    if db_newsletter is None:
        raise HTTPException(status_code=404, detail="Newsletter not found")
    # Actualizar los campos de la newsletter
    for key, value in newsletter.model_dump().items():
        setattr(db_newsletter, key, value)
    db.commit()
    db.refresh(db_newsletter)
    return db_newsletter