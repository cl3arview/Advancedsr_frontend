import React, { useEffect, useState } from 'react';
import { Grid, Box } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import ImageCard from './ImageCard';
import { useImageUpdate } from '@/contexts/ImageUpdateContext';

function ImageGrid() {
  const [images, setImages] = useState([]);
  const { username } = useAuth();
  const { updateFlag } = useImageUpdate();

  useEffect(() => {
    const fetchImages = async () => {
      if (username) {
        try {
          const response = await axios.get(`http://localhost:8080/api/images?username=${username}`);
          setImages(response.data);
        } catch (error) {
          console.error('Failed to fetch images:', error);
        }
      }
    };

    fetchImages();
  }, [username,updateFlag]);

  return (
    <Box display="flex" justifyContent="center" pt={2}>
      <Grid container spacing={2} sx={{
        maxWidth: 1380,
        justifyContent: "center",
        gap: 1,
        
        overflowY: 'auto'
      }}>
        {images.map((image, index) => (
          <Grid item xs={2} key={index}>
            <ImageCard image={image} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ImageGrid;
