from fastapi import FastAPI, File, UploadFile, Form, Depends, HTTPException
from fastapi.responses import FileResponse, JSONResponse
from sqlalchemy.orm import Session
from . import crud, models, schemas, database
from .database import SessionLocal, engine
import os
import shutil
from fastapi.middleware.cors import CORSMiddleware
import logging
from pydantic import BaseModel, Field, ValidationError

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with your frontend URL in production
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

# Create database tables
models.Base.metadata.create_all(bind=engine)

# Directory for file uploads
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Dependency to get a database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Custom validation for latitude and longitude
class PhotoUploadForm(BaseModel):
    title: str
    description: str
    latitude: float = Field(..., ge=-90, le=90)
    longitude: float = Field(..., ge=-180, le=180)

# Endpoint to upload a photo
@app.post("/photos/upload/", response_model=schemas.Photo)
async def upload_photo(
    file: UploadFile = File(...),
    title: str = Form(...),
    description: str = Form(...),
    latitude: float = Form(...),
    longitude: float = Form(...),
    db: Session = Depends(get_db)
):
    try:
        # Validate latitude and longitude
        photo_form = PhotoUploadForm(
            title=title, description=description, latitude=latitude, longitude=longitude
        )
    except ValidationError as e:
        # logger.error(f"Validation error: {e.errors()}")
        raise HTTPException(status_code=422, detail=e.errors())

    if not file.content_type.startswith("image/"):
        # logger.error("Uploaded file is not an image")
        raise HTTPException(status_code=400, detail="Uploaded file must be an image")

    file_path = os.path.join(UPLOAD_DIR, file.filename)
    try:
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
    except Exception as e:
        # logger.error(f"Failed to save file: {e}")
        raise HTTPException(status_code=500, detail="Failed to save file")

    photo_metadata = schemas.PhotoCreate(
        title=title,
        description=description,
        latitude=latitude,
        longitude=longitude,
        file_path=file.filename
    )
    
    db_photo = crud.create_photo(db=db, photo=photo_metadata, file_path=file.filename)
    # logger.info(f"Photo uploaded: {file_path}, Metadata: {photo_metadata}")  # Log photo upload details
    return db_photo

# Endpoint to retrieve all photos
@app.get("/photos/", response_model=list[schemas.Photo])
def read_photos(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    photos = crud.get_photos(db, skip=skip, limit=limit)
    # logger.info(f"Photos retrieved: {photos}")  # Log the retrieved photos
    return photos

# Endpoint to retrieve a specific photo by ID
@app.get("/photos/{photo_id}", response_model=schemas.Photo)
def read_photo(photo_id: int, db: Session = Depends(get_db)):
    db_photo = crud.get_photo(db, photo_id=photo_id)
    if db_photo is None:
        # logger.error(f"Photo not found: {photo_id}")
        raise HTTPException(status_code=404, detail="Photo not found")
    return db_photo

# Endpoint to retrieve uploaded files
@app.get("/uploads/{filename}", response_class=FileResponse)
def get_file(filename: str):
    # logger.info(f"Requested file: {filename}")  # Log the requested filename
    file_path = os.path.join(UPLOAD_DIR, filename)
    if not os.path.exists(file_path):
        # logger.error(f"File not found: {filename}")
        raise HTTPException(status_code=404, detail="File not found")
    return FileResponse(file_path)

# Exception handler for Method Not Allowed (405) errors
@app.exception_handler(405)
async def method_not_allowed_exception_handler(request, exc):
    return JSONResponse(
        status_code=405,
        content={"message": "Method Not Allowed", "detail": str(exc)},
    )