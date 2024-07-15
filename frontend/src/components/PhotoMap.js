import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Container, Box, Typography } from '@mui/material';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS

const PhotoMap = ({ photos }) => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Photo Map
      </Typography>
      <Box sx={{ height: '500px', width: '100%', marginTop: 2 }}>
        <MapContainer center={[20, 0]} zoom={2} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {photos.map((photo) => {
            const photoUrl = `http://localhost:8000/uploads/${photo.file_path}`;
            console.log('Photo URL:', photoUrl); // Log the photo URL

            return (
              <Marker key={photo.id} position={[photo.latitude, photo.longitude]}>
                <Popup>
                  <div>
                    <img
                      src={photoUrl}
                      alt={photo.title}
                      style={{ width: '100px' }}
                      onError={(e) => {
                        console.error(`Failed to load image at ${photoUrl}`);
                        e.target.style.display = 'none';
                      }}
                    />
                    <Typography variant="body2" color="textPrimary">
                      {photo.title}
                    </Typography>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </Box>
    </Container>
  );
};

export default PhotoMap;
