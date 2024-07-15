from pydantic import BaseModel

class PhotoBase(BaseModel):
    title: str
    description: str
    latitude: float
    longitude: float

class PhotoCreate(PhotoBase):
    file_path: str  # Add file_path to PhotoCreate schema

class Photo(PhotoBase):
    id: int
    file_path: str  # Add file_path to Photo schema

    class Config:
        orm_mode = True
