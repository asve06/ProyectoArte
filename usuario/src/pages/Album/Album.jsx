import React, { useState } from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography, Container, Link, Modal, Box } from '@mui/material';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom'; 
import Layout from '../Dashboard/Layout';
import ObraImage from './ETObra.jpg'; 

const theme = createTheme({
  // Agrega tu tema aquí
});

const HeroContent = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(8, 0, 6),
}));

const HeroButtons = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

const CardGrid = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
}));

const CardStyled = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const CardMediaStyled = styled(CardMedia)(({ theme }) => ({
  paddingTop: '56.25%', // 16:9
}));

const CardContentStyled = styled(CardContent)(({ theme }) => ({
  flexGrow: 1,
}));

const Footer = styled('footer')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(6),
}));

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  maxHeight: '80%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Album() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState('edit'); 

  const handleOpen = (type) => {
    setModalType(type);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <main>
          <HeroContent>
            <Container maxWidth="sm">
              <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom style={{ fontStyle: 'oblique', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                Album Layout
              </Typography>
              <Typography variant="h6" align="center" color="textSecondary" paragraph style={{ textAlign: 'justify' }}>
                Esta fascinante colección de Enrique Tábara, un maestro del arte contemporáneo ecuatoriano, presenta una selección de sus obras más icónicas, donde la abstracción y el informalismo cobran vida a través de técnicas innovadoras y una paleta vibrante. Cada pieza es un testimonio de su visión única y su pasión por explorar los límites de la creatividad. ¡Disfruta de este viaje artístico y déjate inspirar por la genialidad de Tábara!
              </Typography>
              <HeroButtons>
                <Grid container spacing={2} justifyContent="center">
                  <Grid item>
                    <Button variant="contained" color="primary">
                      Botón
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="outlined" color="primary">
                      Botón 2
                    </Button>
                  </Grid>
                </Grid>
              </HeroButtons>
            </Container>
          </HeroContent>
          <CardGrid maxWidth="md">
            <Grid container spacing={4}>
              {cards.map((card) => (
                <Grid item key={card} xs={12} sm={6} md={4}>
                  <CardStyled>
                    <CardMediaStyled
                      image={ObraImage}
                      title="Horizonte de los eventos"
                    />
                    <CardContentStyled>
                      <Typography gutterBottom variant="h5" component="h2">
                        Horizonte de los eventos
                      </Typography>
                      <Typography>
                        Una representación abstracta y vibrante que explora los límites de la percepción visual y espacial.
                      </Typography>
                    </CardContentStyled>
                    <CardActions>
                      <Button size="small" color="primary" onClick={() => navigate('/obradetail')}>
                        View
                      </Button>
                      <Button size="small" color="primary" onClick={() => handleOpen('edit')}>
                        Edit
                      </Button>
                    </CardActions>
                  </CardStyled>
                </Grid>
              ))}
            </Grid>
          </CardGrid>
        </main>
        <Footer>
          <Typography variant="h6" align="center" gutterBottom>
            Footer
          </Typography>
          <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
            Something here to give the footer a purpose!
          </Typography>
          <Copyright />
        </Footer>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box sx={modalStyle}>
            <Typography id="modal-title" variant="h6" component="h2">
              {modalType === 'edit' ? 'Horizonte de los eventos' : 'Horizonte de los eventos'}
            </Typography>
            <CardMedia
              component="img"
              image={ObraImage}
              alt="Obra"
              style={{ width: '70%', height: 'auto' }}
            />
            {modalType === 'edit' && (
              <Box sx={{ mt: 2 }}>
                <Typography>                        Una representación abstracta y vibrante que explora los límites de la percepción visual y espacial.
                </Typography>
              </Box>
            )}
          </Box>
        </Modal>
      </Layout>
    </ThemeProvider>
  );
}
