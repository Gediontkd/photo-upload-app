from sqlalchemy import Column, Integer, String, Float
from .database import Base

class Photo(Base):
    __tablename__ = "photos"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String, index=True)
    latitude = Column(Float, index=True)
    longitude = Column(Float, index=True)
    file_path = Column(String, index=True)  # Ensure file_path is included
