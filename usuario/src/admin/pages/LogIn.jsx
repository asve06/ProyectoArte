import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Paper, Box, Grid, Typography } from '@mui/material';
import { LockOutlined as LockOutlinedIcon } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import BackgroundImage from '../../assets/images/ET.jpg'; 
import { useState } from 'react';
import { login } from '../../api/auth.api';
import { useNavigate } from 'react-router-dom';

// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

const theme = createTheme({
  palette: {
    secondary: {
      main: '#092966', 
    },
    orange: {
      main: '#FC800C', 
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#092966', // Color del outline normal
            },
            '&:hover fieldset': {
              borderColor: '#070d3d', // Color del outline al pasar el ratón
            },
            '&.Mui-focused fieldset': {
              borderColor: '#070d3d', // Color del outline cuando está enfocado
            },
          },
          '& .MuiInputLabel-root': {
            color: '#092966', // Color de las etiquetas (input labels)
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#070d3d', // Color de las etiquetas cuando están enfocadas
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: '#070d3d', 
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#FC800C', // enlaces
          textDecoration: 'underline', //linea de abajo de enlaces
          '&:hover': {
            color: '#092966', 
            textDecoration: 'underline', 
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: 'rgba(252, 128, 12, 0.5)', // checkbox
          '&.Mui-checked': {
            color: '#FC800C', //
          },
          '&:hover': {
            backgroundColor: 'rgba(252, 128, 12, 0.1)', 
          },
        },
      },
    },
  },
});


export default function SignInSide() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      // Guardar el token en el almacenamiento local o en el estado global
      localStorage.setItem('admin-auth', data.access_token);
      console.log(data);
      navigate('/admin/dashboard');
    }catch (error){
      setError('Invalid email or password');
    }
  }
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${BackgroundImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: 'rgba(252, 128, 12, 0.5)', // Fondo naranja con transparencia
            backgroundSize: 'cover',
            backgroundPosition: 'bottom',
            position: 'relative',
          }}
        >
          {/* Texto "Enrique" y "Tabara" */}
          <Box
            sx={{
              position: 'absolute',
              top: '10%',
              left: '50%',
              transform: 'translateX(-50%)',
              textAlign: 'center',
              width: '100%',
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontFamily: 'Roboto',
                fontSize: '100px',
                color: '#fff',
                fontWeight: 'bold', 
                marginBottom: '-40px', // Ajusta el espacio entre "Enrique" y "Tabara"
                textShadow: '4px 4px 20px rgba(0, 0, 0, 20)', // Sombreado 
              }}
            >
              Enrique
            </Typography>
            <Typography
              variant="h1"
              sx={{
                fontFamily: 'Roboto',
                fontSize: '120px',
                color: '#000',
                fontWeight: 'bold', 
                textShadow: '10px 10px 30px rgba(255, 255, 255, 70)'
              }}
            >
              Tábara
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && (
                <Typography color="error" variant="body2">
                  {error}
                </Typography>
              )}
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: '#092966' }} 
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              {/* <Box mt={5}>
                <Copyright />
              </Box> */}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
