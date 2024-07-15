import React, { useState, useEffect } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography } from '@mui/material';

const PhotoGallery = ({ photos }) => {
  console.log('Photos:', photos); // Check what photos are received
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(false); // Assuming photos are loaded once component mounts
  }, []);

  if (loading) {
    return <Typography variant="h5">Loading...</Typography>;
  }

  if (error) {
    return <Typography variant="h5" color="error">{error.message}</Typography>;
  }

  return (
    <Grid container spacing={4}>
      {photos.map((photo) => {
        console.log('Photo:', photo);
        return (
          <Grid item key={photo.id} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={`http://localhost:8000/uploads/${photo.file_path}`}
                alt={photo.title}
              />
              <CardContent>
                <Typography variant="h6">{photo.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {photo.description}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {photo.latitude}, {photo.longitude}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default PhotoGallery;
