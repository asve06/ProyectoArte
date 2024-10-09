import { Container, Typography, Box, Paper, styled } from '@mui/material';
import TabaraFirmaFondo from '../../assets/images/TabaraFirmaFondo.png';
import BackgroundImage from '../../assets/images/ET1.jpeg'; 
import Typewriter from 'typewriter-effect';

const WelcomeBox = styled(Paper)(({ theme }) => ({
  backgroundColor: '#ccc5b7',
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  textAlign: 'center',
  color: '#fff',
  marginTop: theme.spacing(2),
}));

const InfoBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: theme.spacing(2),
}));

const home = [
  {
    text: "Hola, bienvenido al inventario de",
    name: "Enrique Tábara",
    desc: "Descubre más sobre su vida y obras.",
  },
];


const Dashboard = () => {
  return (
    <Container maxWidth="md" sx={{ textAlign: 'center' }}>
      {/* Sección hero */}
      <section className='hero'>
        {home.map((val, i) => (
          <div className='heroContent' key={i}>
            <h3 className='fontSize' data-aos='fade-right' style={{ fontSize: '50px', fontWeight: 'bold',marginTop: '60px' }}>
              {val.text}
            </h3>
            <h1 style={{ fontSize: '90px', fontWeight: 'bold',marginTop: '100px', color: '#7EACB5' }}> 
              <Typewriter
                options={{
                  strings: [`${val.name}`],
                  autoStart: true,
                  loop: true,
                }}
              />
            </h1>
            <p 
  style={{ fontSize: '20px', marginTop: '200px', marginBottom: '200px', fontWeight: 'normal', cursor: 'pointer', color: 'black' }}
>
  {val.desc}
</p>
       </div>
        ))}
      </section>

      {/* Cuadro de bienvenida */}
      <WelcomeBox>
        <Typography variant="h3" sx={{ fontFamily: 'Arial', fontWeight: 'bold', fontSize: '58px' }}>
          Bienvenido
        </Typography>
      </WelcomeBox>

      {/* Imagen del autor y texto */}
      <InfoBox>
        <Box sx={{ flex: 1, textAlign: 'left', padding: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Información sobre el autor
          </Typography>
          <Typography variant="body1" sx={{ marginTop: 1 }}>
            A partir de 2021, cuando fallece el Maestro, la Fundación Enrique Tábara inicia la recopilación del extenso material acerca de su vida y obra con el propósito de estudiar, interpretar, ordenar, clasificar y digitalizar todos los documentos que se puedan reunir.
          </Typography>
        </Box>
        <Box
          component="img"
          src={TabaraFirmaFondo}
          alt="Imagen del autor"
          sx={{ width: '150px', height: 'auto', borderRadius: 2 }}
        />
      </InfoBox>
      <Box
        component="img"
        src={BackgroundImage}
        alt="Descripción de la foto"
        sx={{ width: '100%', height: 'auto', borderRadius: 2, mt: 2 }}
      />

      {/* Texto adicional */}
      <Typography
        variant="body1"
        paragraph
        sx={{
          fontFamily: 'Roboto',
          fontWeight: 'normal',
          fontSize: '17px',
          textAlign: 'center',
          mt: 2,
        }}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt, est a luctus pellentesque, justo libero malesuada libero, eu dapibus magna lorem eget odio.
      </Typography>
    </Container>
  );
};

export default Dashboard;
