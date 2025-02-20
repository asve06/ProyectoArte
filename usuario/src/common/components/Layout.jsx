import { useState } from 'react';
import { AppBar, Box, CssBaseline, IconButton, Link, Toolbar, Typography, Container, } from '@mui/material';
import { Menu as MenuIcon, Logout as LogoutIcon } from '@mui/icons-material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Sidebar from './Sidebar';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../admin/context/useAuth';

const theme = createTheme({
  palette: {
    primary: {
      main: '#5d5c31', //color de la barra de navegacion #262C38
    },
    secondary: {
      main: '#253846', //color de los botones #70D448
    },
    error: {
      main: '#f44336',
    },
    background: {
      default: '#fff',
    },
  },

  typography: {
    fontFamily:['PT Sans', 'sans-serif'].join(',')
  },

  components: {
    MuiTextField: {
      defaultProps: {
        InputLabelProps: {
          color: 'primary',
          fontSize: '1rem',
        },
        InputProps: {
          color: '#333',
          borderColor: '#1976d2',
        }
      }
    }
  }
});

const drawerWidth = 180;

const AppBarStyled = styled(AppBar)(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const AppBarSpacer = styled('div')(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

const ContentStyled = styled('main')(() => ({
  flexGrow: 1,
  height: '100vh',
  overflow: 'auto',
  transition: 'margin 0.3 ease',
}));

const ContainerStyled = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

// Componente Copyright
// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Link      </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

// Componente principal Layout
export default function Layout({ children }) {
  const [open, setOpen] = useState(false); //el alse de aqui es para que sea cerrado por default 
  const location = useLocation();
  const role = location.pathname.startsWith('/admin') ? 'admin' : 'user';
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();

  const handleDrawerToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin-auth');
    setIsAuthenticated(false);
    navigate('/admin/login');
  }

  return (
    <ThemeProvider theme={theme}>
      <Box style={{ display: 'flex' }}>
        <CssBaseline />
        <AppBarStyled position="absolute" open={open}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              style={{ marginRight: 36 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap style={{ flexGrow: 1 }}>
              Home
            </Typography>
            {role === 'admin' && (
              <IconButton color="inherit" onClick={handleLogout}>
                  <LogoutIcon />
              </IconButton>
            )}
          </Toolbar>
        </AppBarStyled>
        <Sidebar open={open} handleDrawerToggle={handleDrawerToggle} role={role}/>
        <ContentStyled open={open}>
          <AppBarSpacer />
          <ContainerStyled maxWidth="lg">
            {children}
            {/* <Box pt={4}>
              <Copyright />
            </Box> */}
          </ContainerStyled>
        </ContentStyled>
      </Box>
    </ThemeProvider>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired, // children es un nodo requerido para renderizar
}