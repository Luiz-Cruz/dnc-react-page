import React, { useState } from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/router';
import PersonIcon from '@mui/icons-material/Person';
import usePeople from '@/contexts/peopleContext';

function NavBar() {
  const router = useRouter();
  const { currentUser } = usePeople();
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);

  const handleOpenMenu = (setAnchor) => (event) => setAnchor(event.currentTarget);
  const handleCloseMenu = (setAnchor) => () => setAnchor(null);

  const pages = [
    { title: 'Dashboard', onClick: () => router.push('/') },
    { title: 'Cadastro', onClick: () => router.push('/cadastro') },
    { title: 'Pessoas', onClick: () => router.push('/pessoas') },
  ];

  return (
    <AppBar position="static">
      <Container maxWidth="xxl">
        <Toolbar disableGutters>
          <img src="https://ed.escoladnc.com.br/wp-content/webp-express/webp-images/uploads/2024/04/logo-dnc-branco.png.webp" alt="logo" height={36} style={{ marginRight: '1rem' }} />

          {/* Menu Desktop  */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' } }}>
            {pages.map((page) => (
              <Button key={page.title} onClick={page.onClick} sx={{ my: 2, color: 'white', display: 'block' }}>
                <Typography variant="h6" textAlign="center">{page.title}</Typography>
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 1, visibility: { xs: 'hidden', sm: 'visible' } }}/>

          {/* Menu Mobile */}
          <Box sx={{ flexGrow: 0, display: { xs: 'flex', sm: 'none' } }}>
            <IconButton onClick={handleOpenMenu(setMobileMenuAnchor)} color="inherit">
              <MenuIcon fontSize='36px' />
            </IconButton>
            <Menu
              anchorEl={mobileMenuAnchor}
              open={Boolean(mobileMenuAnchor)}
              onClose={handleCloseMenu(setMobileMenuAnchor)}
              sx={{ display: { xs: 'block', md: 'none' }}}
            >
              {pages.map((page) => (
                <MenuItem key={page.title} onClick={page.onClick}>
                  <Typography variant="h6" textAlign="center">{page.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Perfil */}
          <Box sx={{ flexGrow: 0 }}>
            <IconButton onClick={handleOpenMenu(setProfileMenuAnchor)} sx={{ p: 0 }}>
              <Avatar alt={currentUser.name} src={currentUser.profileImg} />
            </IconButton>
            <Menu
              anchorEl={profileMenuAnchor}
              open={Boolean(profileMenuAnchor)}
              onClose={handleCloseMenu(setProfileMenuAnchor)}
            >
              <MenuItem>
                <PersonIcon />
                <Typography ml={1}>{currentUser.name}</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
