import { useState, useEffect } from 'react';
import { Card, CardMedia, Grid, Typography, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import { getAllObras } from '../../api/index.api';

const HeroContent = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const CardGrid = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
}));

const CardStyled = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  overflow: 'hidden',
  boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.5)',
  borderRadius: '0',
}));

const CardMediaStyled = styled(CardMedia)(({ theme }) => ({
  width: '100%',
  height: '400px',
  transition: 'transform 0.5s ease',
  '&:hover': {
    transform: 'scale(1.1)',
  },
}));

const HoverContent = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  color: 'white',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  opacity: 0,
  transition: 'opacity 0.5s ease',
  padding: theme.spacing(4),
  '&:hover': {
    opacity: 1,
  },
}));

const HoverTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold', 
  textAlign: 'center', 
  marginBottom: theme.spacing(4), 
}));

const HoverDescription = styled(Typography)(({ theme }) => ({
  textAlign: 'justify', 
  marginBottom: theme.spacing(4), 
}));

export default function Album() {
  const [obras, setObras] = useState([]);

  useEffect(() => {
    async function loadObras() {
      const res = await getAllObras();
      setObras(res.data);
    }
    loadObras();
  }, []);

  return (
    <>
      <main style={{ color: 'white', minHeight: '100vh' }}>
        <HeroContent>
          <Container maxWidth="lg">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
              style={{ fontStyle: 'oblique', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}
            >
              Album
            </Typography>
            <Typography
              variant="h6"
              align="center"
              color="textSecondary"
              paragraph
              style={{ textAlign: 'justify', color: 'black' }}
            >
              Esta fascinante colección de Enrique Tábara, un maestro del arte contemporáneo ecuatoriano, presenta una
              selección de sus obras más icónicas, donde la abstracción y el informalismo cobran vida a través de
              técnicas innovadoras y una paleta vibrante. Cada pieza es un testimonio de su visión única y su pasión por
              explorar los límites de la creatividad. ¡Disfruta de este viaje artístico y déjate inspirar por la
              genialidad de Tábara!
            </Typography>
          </Container>
        </HeroContent>
        <CardGrid maxWidth="lg">
          <Grid container spacing={7}>
            {obras.map((obra) => (
              <Grid item key={obra.id} xs={12} sm={6} md={4}>
                <CardStyled>
                  <CardMediaStyled
                    image={obra.url_imagen || 'http://127.0.0.1:8000/static/images/default.jpg'}
                    title={obra.titulo}
                    año = {obra.fecha_creacion}
                  />
                  <HoverContent>
                    <HoverTitle variant="h5" component="h2">
                      {obra.titulo}
                    </HoverTitle>
                    <HoverDescription variant="body2">
                      {obra.descripcion.length > 100
                        ? `${obra.descripcion.substring(0, 100)}...`
                        : obra.descripcion}
                    </HoverDescription>
                    <Typography variant="body2"> {obra.fecha_creacion}</Typography>
                  </HoverContent>
                </CardStyled>
              </Grid>
            ))}
          </Grid>
        </CardGrid>
      </main>
    </>
  );
}
