import React from 'react';
import { AppBar, Box, CssBaseline, IconButton, Link, Toolbar, Typography, Container, Badge } from '@mui/material';
import { Menu as MenuIcon, Notifications as NotificationsIcon } from '@mui/icons-material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Sidebar from './Sidebar';

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

const DrawerPaperStyled = styled('div')(({ theme, open }) => ({
  position: 'relative',
  whiteSpace: 'nowrap',
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
}));

const AppBarSpacer = styled('div')(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

const ContentStyled = styled('main')(({ open }) => ({
  flexGrow: 1,
  height: '100vh',
  overflow: 'auto',
  marginLeft: open ? drawerWidth : 0,
  transition: 'margin 0.3s',
}));

const ContainerStyled = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

// Componente Copyright
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Link      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// Componente principal Layout
export default function Layout({ children }) {
  const [open, setOpen] = React.useState(false); //el alse de aqui es para que sea cerrado por default 

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
        <DrawerPaperStyled open={open}>
          <Sidebar open={open} handleDrawerToggle={handleDrawerToggle} />
        </DrawerPaperStyled>
        <ContentStyled open={open}>
          <AppBarSpacer />
          <ContainerStyled maxWidth="lg">
            {children}
            <Box pt={4}>
              <Copyright />
            </Box>
          </ContainerStyled>
        </ContentStyled>
      </div>
    </ThemeProvider>
  );
}
