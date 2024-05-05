import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Menu,
  MenuItem
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import MenuIcon from '@mui/icons-material/Menu';  // Menu icon for dropdown
import { useRouter } from 'next/router';

function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1, textAlign: 'center' }}>
          Text to Modify
        </Typography>
        <IconButton
          aria-label="account actions"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => { router.push('/SignIn'); handleClose(); }}>Login</MenuItem>
          <MenuItem onClick={() => { router.push('/Register'); handleClose(); }}>Register</MenuItem>
          <MenuItem onClick={() => { router.push('/'); handleClose(); }}>Log Out</MenuItem>
        </Menu>
        <IconButton color="inherit" href="https://github.com/cl3arview" target="_blank">
          <GitHubIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
