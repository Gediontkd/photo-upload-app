from sqlalchemy.orm import Session
from . import models, schemas

def create_photo(db: Session, photo: schemas.PhotoCreate, file_path: str):
    db_photo = models.Photo(
        title=photo.title,
        description=photo.description,
        latitude=photo.latitude,
        longitude=photo.longitude,
        file_path=file_path  # Ensure file_path is set correctly
    )
    db.add(db_photo)
    db.commit()
    db.refresh(db_photo)
    return db_photo

def get_photos(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Photo).offset(skip).limit(limit).all()

def get_photo(db: Session, photo_id: int):
    return db.query(models.Photo).filter(models.Photo.id == photo_id).first()