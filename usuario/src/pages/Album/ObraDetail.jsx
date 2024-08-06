import { Container, CardMedia, IconButton } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import ObraImage from './ETObra.jpg';

export default function ObraDetail() {
  return (
    <Container>
      <IconButton component={Link} to="/Album" color="primary">
        <ArrowBackIcon />
      </IconButton>
      <CardMedia
        component="img"
        image={ObraImage}
        alt="Obra"
        style={{ width: '100%', height: 'auto' }}
      />
    </Container>
  );
}
