import Layout from './Layout';
import { Container, Typography, Box, Paper, styled } from '@mui/material';
import BackgroundImage from './ET1.jpeg'; 

//Cuadro de bienvenidoooo
const WelcomeBox = styled(Paper)(({ theme }) => ({
  backgroundColor: '#FC800C', // Color naranja
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  textAlign: 'center',
  color: '#fff',
  marginTop: theme.spacing(2),
}));

const Dashboard = () => {
  return (
    <Layout>
      <Container maxWidth="md" sx={{ textAlign: 'center' }}> {/* Centrar contenido del contenedor */}
        {/* Foto */}
        <Box 
          component="img" 
          src={BackgroundImage} 
          alt="Descripción de la foto" 
          sx={{ width: '100%', height: 'auto', borderRadius: 2, mb: 2 }} 
        />
        {/* Texto descriptivo */}
        <Typography 
          variant="body1" 
          paragraph
          sx={{ 
            fontFamily: 'Roboto', 
            fontWeight: 'normal', 
            fontSize: '17px',
            textAlign: 'center' 
          }}
        >
          A partir de 2021, cuando fallece el Maestro, la Fundación Enrique Tábara inicia la recopilación del extenso material acerca de su vida y obra con el propósito de estudiar, interpretar, ordenar, clasificar y digitalizar todos los documentos que se puedan reunir.
        </Typography>
        {/* Cuadro de bienvenida */}
        <WelcomeBox>
          <Typography 
            variant="h3"
            sx={{ fontFamily: 'Arial', fontWeight: 'bold', fontSize: '58px' }} 
          >
            Bienvenido
          </Typography>
        </WelcomeBox>
      </Container>
    </Layout>
  );
};

export default Dashboard;
