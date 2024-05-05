import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Backdrop,
  CircularProgress,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import GetAppIcon from '@mui/icons-material/GetApp';
import { useAuth } from '../contexts/AuthContext'; // Ensure this path is correct
import { useImageUpdate } from '../contexts/ImageUpdateContext'; // Ensure this path is correct

function ImageUploadCard() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [processedImageUrl, setProcessedImageUrl] = useState(null);
  const [imageModel, setImageModel] = useState('');
  const [denoiseStrength, setDenoiseStrength] = useState(0.5);
  const [upscaleFactor, setUpscaleFactor] = useState(2);
  const { authToken } = useAuth(); // Access the authToken from the AuthContext
  const { setUpdateFlag } = useImageUpdate();

  const uploadImage = useCallback(async (file) => {
    if (!file) {
      alert('No file selected');
      return;
    }

    if (file.type !== 'image/png') {
      alert('Only PNG images are accepted');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    console.log("AuthToken at upload:", authToken); // Debugging line to check authToken

    try {
      const response = await fetch('http://localhost:8080/api/images/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`, // Include the authToken in the request headers
        },
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        setProcessedImageUrl(URL.createObjectURL(blob));
        setUpdateFlag(prevFlag => !prevFlag); // Toggle the flag to indicate an update

      } else {
        console.error('Upload failed:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Upload failed', error);
    }
  }, [authToken, setUpdateFlag]); // authToken included as a dependency to re-create the callback when it changes

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file && file.type === 'image/png') {
      setSelectedImage(URL.createObjectURL(file));
      setSelectedFile(file);
    } else {
      alert('Only PNG images are accepted');
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/png',
    multiple: false,
  });

  const handleClearImage = () => {
    setSelectedImage(null);
    setSelectedFile(null);
    setProcessedImageUrl(null);
  };

  const handleDownloadImage = (e) => {
    e.stopPropagation();
    const link = document.createElement('a');
    link.href = processedImageUrl;
    link.download = `${selectedFile.name.replace('.png', '_upscaled.png')}`;
    link.click();
  };
  return (
    <Box sx={{ maxWidth: 1300, margin: 'auto', textAlign: 'center' }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Options/Parameters
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="model-select-label">Model</InputLabel>
            <Select
              labelId="model-select-label"
              id="model-select"
              value={imageModel}
              label="Model"
              onChange={(e) => setImageModel(e.target.value)}
            >
              <MenuItem value="realesr-general-x4v3">realesr-general-x4v3</MenuItem>
              {/* Add more model options here */}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6} md={3}>
          <Typography gutterBottom>
            Denoise Strength: {denoiseStrength.toFixed(2)}
          </Typography>
          <Slider
            value={denoiseStrength}
            onChange={(e, newValue) => setDenoiseStrength(newValue)}
            step={0.1}
            min={0}
            max={1}
            aria-labelledby="denoise-strength-slider"
          />
        </Grid>

        <Grid item xs={6} md={3}>
          <Typography gutterBottom>
            Image Upscaling Factor: {upscaleFactor}
          </Typography>
          <Slider
            value={upscaleFactor}
            onChange={(e, newValue) => setUpscaleFactor(newValue)}
            step={1}
            min={1}
            max={4}
            aria-labelledby="image-upscaling-factor-slider"
          />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent
              {...getRootProps()}
              sx={{
                height: 300,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                position: 'relative',
              }}
            >
              <input {...getInputProps()} />
              {selectedImage ? (
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <IconButton
                    onClick={(e) => { e.stopPropagation();  handleClearImage(); }}
                    sx={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      zIndex: 1,
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <img
                    src={selectedImage}
                    alt="Preview"
                    style={{
                      maxHeight: '100%',
                      maxWidth: '100%',
                      objectFit: 'contain',
                      width: 'auto',
                      height: 'auto',
                    }}
                  />
                </Box>
              ) : (
                <Typography>Drop Image Here or Click to Upload</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent
              sx={{
                height: 300,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
              }}
            >
              {processedImageUrl ? (
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <IconButton
                    onClick={handleDownloadImage}
                    sx={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      zIndex: 1,
                    }}
                  >
                    <GetAppIcon />
                  </IconButton>
                  <img
                    src={processedImageUrl}
                    alt="Processed"
                    style={{
                      maxHeight: '100%',
                      maxWidth: '100%',
                      objectFit: 'contain',
                      width: 'auto',
                      height: 'auto',
                    }}
                  />
                </Box>
              ) : (
                <Typography>Restored Image will appear here</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} md={6}>
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            onClick={() => uploadImage(selectedFile, setProcessedImageUrl)}
          >
            Restore Image
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Button variant="outlined"   onClick={handleClearImage} fullWidth sx={{ mt: 2 }}>
            Reset
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ImageUploadCard;
