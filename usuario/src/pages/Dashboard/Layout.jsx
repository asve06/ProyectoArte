import React from 'react';
import { AppBar, Box, CssBaseline, Divider, Drawer, IconButton, Link, List, Toolbar, Typography, Container, Badge } from '@mui/material';
import { Menu as MenuIcon, ChevronLeft as ChevronLeftIcon, Notifications as NotificationsIcon } from '@mui/icons-material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { mainListItems } from './listItems';

// Tema de Material-UI
const theme = createTheme({
  palette: {
    primary: {
      main: '#262C38',
    },
    secondary: {
      main: '#70D448',
    },
    error: {
      main: '#f44336',
    },
    background: {
      default: '#fff',
    },
  },
});

const drawerWidth = 240;

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

const DrawerStyled = styled(Drawer)(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    ...(open === false && {
      overflowX: 'hidden',
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    }),
  },
}));

// Componente Copyright
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

// Componente principal Layout
export default function Layout({ children }) {
  const [open, setOpen] = React.useState(true);

  const handleDrawerToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ display: 'flex' }}>
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
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBarStyled>
        <DrawerStyled variant="permanent" open={open}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0 8px', height: '64px' }}>
            <IconButton onClick={handleDrawerToggle}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>{mainListItems}</List>
          <Divider />
        </DrawerStyled>
        <main style={{ flexGrow: 1, height: '100vh', overflow: 'auto', marginLeft: open ? drawerWidth : 0, transition: 'margin 0.3s' }}>
          <div style={{ ...theme.mixins.toolbar }} />
          <Container style={{ paddingTop: theme.spacing(4), paddingBottom: theme.spacing(4) }} maxWidth="lg">
            {children}
            <Box pt={4}>
              <Copyright />
            </Box>
          </Container>
        </main>
      </div>
    </ThemeProvider>
  );
}
