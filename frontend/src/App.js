import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PhotoForm from './components/PhotoForm';
import PhotoGallery from './components/PhotoGallery';
import PhotoMap from './components/PhotoMap';

function App() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get('http://localhost:8000/photos/');
        setPhotos(response.data);
      } catch (error) {
        console.error('There was an error fetching the photos!', error);
      }
    };

    fetchPhotos();
  }, []);

  const handlePhotoUploaded = (newPhoto) => {
    setPhotos([...photos, newPhoto]);
  };

  return (
    <div className="App">
      <h1>Photo Upload and Display</h1>
      <PhotoForm onPhotoUploaded={handlePhotoUploaded} />
      <h2>Gallery</h2>
      <PhotoGallery photos={photos} />
      <h2>Map</h2>
      <PhotoMap photos={photos} />
    </div>
  );
}

export default App;