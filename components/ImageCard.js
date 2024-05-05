import React, { useEffect, useState } from 'react';
import { Card, CardMedia, CardContent, Typography, IconButton, Box } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import axios from 'axios';

export default function ImageCard({ image }) {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchImage = async () => {
      // Extract the filename from the path
      const fileName = image.imagePath.split('/').pop();
      const url = `http://localhost:8080/api/images/${fileName}`;
      
      try {
        const response = await axios.get(url, {
          responseType: 'blob' // Set responseType as blob for binary data
        });
        const imageBlob = response.data;
        const localUrl = URL.createObjectURL(imageBlob); // Create a local URL from the blob
        setImageUrl(localUrl);
      } catch (error) {
        console.error('Failed to load image:', error);
      }
    };

    fetchImage();
  }, [image]); // Depend on imagePath to refetch if it changes

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={imageUrl} // Use the local URL created from the blob
        alt="Image"
      />
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography gutterBottom variant="h5" component="div">
            Uploaded Image
          </Typography>
          <a href={imageUrl} download style={{ textDecoration: 'none' }}>
            <IconButton color="primary" aria-label="download">
              <DownloadIcon />
            </IconButton>
          </a>
        </Box>
      </CardContent>
    </Card>
  );
}
