import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Box } from '@mui/system';
import { useTheme } from '@mui/material';
import Link from 'next/link';

const Footer = () => {
  const theme = useTheme();

  return (
    <Box component="footer" sx={{ py: 3, px: 2, mt: 'auto', backgroundColor: theme.palette.primary.main, color: '#FFFFFF' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Links de contato */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6">Entre em contato</Typography>
            <Typography variant="body2">(19) 99187-4342</Typography>
            <Link href="mailto:contato@escoladnc.com.br" passHref>
              <Typography variant="body2">contato@escoladnc.com.br</Typography>
            </Link>
          </Grid>
          {/* Logo e assinatura */}
          <Grid item xs={12} md={4} textAlign="center">
            <img src="https://ed.escoladnc.com.br/wp-content/webp-express/webp-images/uploads/2024/04/logo-dnc-branco.png.webp" alt="Company Logo" style={{ width: '4rem', marginBottom: '8px' }} />
            <Typography variant="h6">Dashboard</Typography>
            <Typography variant="body2">&copy; 2024 DNC Treinamentos</Typography>
          </Grid>
          {/* Endereço */}
          <Grid item xs={12} md={4} textAlign="end">
            <Typography variant="h6">Venha nos conhecer</Typography>
            <Typography variant="body2">R. Justino Cobra, 61</Typography>
            <Typography variant="body2">Vila Ema, São José dos Campos - SP</Typography>
            <Typography variant="body2">12243-030</Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
