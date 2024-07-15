import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Box, Snackbar, Alert } from '@mui/material';

const PhotoForm = ({ onPhotoUploaded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);

  const validateInputs = () => {
    if (!title) return 'Title is required.';
    if (!description) return 'Description is required.';
    if (!latitude || latitude < -90 || latitude > 90) return 'Latitude must be between -90 and 90.';
    if (!longitude || longitude < -180 || longitude > 180) return 'Longitude must be between -180 and 180.';
    if (!file) return 'File is required.';
    if (!file.type.startsWith('image/')) return 'File must be an image.';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      setOpen(true);
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('latitude', latitude);
    formData.append('longitude', longitude);
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:8000/photos/upload/', formData);
      onPhotoUploaded(response.data);
      setTitle('');
      setDescription('');
      setLatitude('');
      setLongitude('');
      setFile(null);
      setError(null);
      setOpen(true); // Open Snackbar for success
    } catch (error) {
      setError('There was an error uploading the photo!');
      setOpen(true); // Open Snackbar for error
    }
  };

  const handleClose = () => {
    setOpen(false);
    setError(null);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Upload Photo
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button 
          variant="contained" 
          component="label" 
          size="small" 
          sx={{ width: '150px' }}
        >
          Upload File
          <input type="file" hidden onChange={(e) => setFile(e.target.files[0])} />
        </Button>
        <TextField 
          label="Title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required 
          error={!!error && !title} 
          helperText={error && !title ? error : ''}
        />
        <TextField 
          label="Description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          required 
          error={!!error && !description} 
          helperText={error && !description ? error : ''}
        />
        <TextField 
          label="Latitude" 
          type="number" 
          value={latitude} 
          onChange={(e) => setLatitude(e.target.value)} 
          required 
          error={!!error && (!latitude || latitude < -90 || latitude > 90)} 
          helperText={error && (!latitude || latitude < -90 || latitude > 90) ? error : ''}
        />
        <TextField 
          label="Longitude" 
          type="number" 
          value={longitude} 
          onChange={(e) => setLongitude(e.target.value)} 
          required 
          error={!!error && (!longitude || longitude < -180 || longitude > 180)} 
          helperText={error && (!longitude || longitude < -180 || longitude > 180) ? error : ''}
        />
        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          size="small" 
          sx={{ width: '150px' }}
        >
          Upload Photo
        </Button>
      </Box>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={error ? 'error' : 'success'}>
          {error ? error : 'Photo uploaded successfully!'}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default PhotoForm;
