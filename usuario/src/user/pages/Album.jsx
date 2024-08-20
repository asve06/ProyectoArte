import { useState, useEffect} from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography, Container, Link, Modal, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { getAllObras } from '../../api/obras.api';

const HeroContent = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const HeroButtons = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

const CardGrid = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
}));

const CardStyled = styled(Card)((  ) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const CardGridStyle = styled(CardGrid)(( ) => ({  
}));

const CardMediaStyled = styled(CardMedia)(( ) => ({
  paddingTop: '56.25%', // 16:9
}));

const CardContentStyled = styled(CardContent)(( ) => ({
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

/*function Copyright() {
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
}*/

export default function Album() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [obras, setObras] = useState([]);
  const [selectedObra, setSelectedObra] = useState(null);

  useEffect(() => {
    async function loadObras() {
      const res = await getAllObras();
      setObras(res.data);
    }
    loadObras();
  }, []);


  const handleOpen = (obra) => {
    setSelectedObra(obra);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false)
    setSelectedObra(null);
  };

  return (
    <>
        <main>
          <HeroContent>
            <Container maxWidth="lg">
              <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom style={{ fontStyle: 'oblique', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                Album
              </Typography>
              <Typography variant="h6" align="center" color="textSecondary" paragraph style={{ textAlign: 'justify' }}>
                Esta fascinante colección de Enrique Tábara, un maestro del arte contemporáneo ecuatoriano, presenta una selección de sus obras más icónicas, donde la abstracción y el informalismo cobran vida a través de técnicas innovadoras y una paleta vibrante. Cada pieza es un testimonio de su visión única y su pasión por explorar los límites de la creatividad. ¡Disfruta de este viaje artístico y déjate inspirar por la genialidad de Tábara!
              </Typography>
              <HeroButtons>
              </HeroButtons>
            </Container>
          </HeroContent>
          <CardGridStyle maxWidth="md">
            <Grid container spacing={4}>
              {obras.map((obra) => (
                <Grid item key={obra.id} xs={12} sm={6} md={3}>
                  <CardStyled>
                    <CardMediaStyled
                      image={obra.archivo}
                      title={obra.titulo}
                    />
                    <CardContentStyled>
                      <Typography gutterBottom variant="h5" component="h2">
                        {obra.titulo}
                      </Typography>
                      <Typography>
                        {obra.descripcion}
                      </Typography>
                    </CardContentStyled>
                    <CardActions>
                      <Button size="small" color="primary" href={obra.archivo} target="_blank"/*onClick={() => navigate(`/obradetail/${obra.id}`)}*/>
                        View
                      </Button>
                    </CardActions>
                  </CardStyled>
                </Grid>
              ))}
            </Grid>
          </CardGridStyle>
        </main>
        <Footer>
          <Typography variant="h6" align="center" gutterBottom>
            Footer
          </Typography>
          <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
            Something here to give the footer a purpose!
          </Typography>
          {/* <Copyright /> */}
        </Footer>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box sx={modalStyle}>
            <Typography id="modal-title" variant="h6" component="h2">
              {selectedObra ? selectedObra.title : ''}
            </Typography>
            <CardMedia
              component="img"
              image={selectedObra ? selectedObra.archivo : ''}
              alt="Obra"
              style={{ width: '70%', height: 'auto' }}
            />
            {selectedObra && (
              <Box sx={{ mt:2 }}>
                <Typography>
                  {selectedObra.description}
                </Typography>
              </Box>
            )}
          </Box>
        </Modal>
    </>
  );
}
