import React from 'react';
import { Box, Container, Grid, Typography, styled, Link } from '@mui/material';

const StyledFooter = styled('footer')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(6),
}));

const Footer = () => {
  return (
    <StyledFooter>
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-evenly">
          {/* ...other grid items */}
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" color="textPrimary" gutterBottom>
              <Link
                href="https://opensource.org/licenses/mit/"
                target="_blank"
                rel="noopener noreferrer"
                color="primary" // Use primary color for the link
              >
  MIT License   
              </Link>
                  | 2024
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </StyledFooter>
  );
};

export default Footer;
