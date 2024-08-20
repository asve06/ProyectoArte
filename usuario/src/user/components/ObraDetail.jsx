import { useEffect, useState } from 'react';
import { Container, CardMedia, IconButton, Typography, Box, CircularProgress } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';
import { getObra } from '../../api/obras.api';

export default function ObraDetail() {
  const { id } = useParams();
  const [obra, setObra] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadObra() {
      try{
        const res = await getObra(id);
        setObra(res.data);
      } catch (error) {
        console.error('Error fetching obra details:', error);
        setError('No se pudo cargar la obra.');
      } finally {
        setLoading(false);
      }
    }

    loadObra();
  }, [id]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!obra) return <Typography>No se encontró la obra.</Typography>;

  return (
    <Container>
      <IconButton component={Link} to="/album" color="primary">
        <ArrowBackIcon />
      </IconButton>
      {obra.archivo ? (
        <CardMedia
          component="img"
          image={obra.archivo}
          alt={obra.titulo}
          style={{ width: '25%', height: 'auto' }}
        />
      ) : (
        <Typography>No se puede mostrar la imagen.</Typography>
      )}
      <Box sx={{ mt: 2 }}>
        <Typography variant="h4">{obra.titulo}</Typography>
        <Typography variant="h6" color="textSecondary">
          {obra.autor}
        </Typography>
        <Typography variant="body1" paragraph>
          {obra.descripcion}
        </Typography>
        {/* Agrega otros detalles de la obra aquí */}
      </Box>
    </Container>
  );
}
