import { Drawer, IconButton, Divider, List } from '@mui/material';
import { ChevronLeft as ChevronLeftIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { mainListItems } from './ListItems';
import PropTypes from 'prop-types';

const drawerWidth = 180;
const drawerWidthCollapsed = 60;

const DrawerStyled = styled(Drawer)(({ theme, open }) => ({
  width: open ? drawerWidth : drawerWidthCollapsed,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: open ? drawerWidth : drawerWidthCollapsed,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
    ...(open === false && {
      width: drawerWidthCollapsed,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    }),
  },
}));

export default function Sidebar({ open, handleDrawerToggle }) {
  return (
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
  );
}

Sidebar.propTypes = {
  open: PropTypes.bool.isRequired, // Indica si el sidebar está abierto o cerrado
  handleDrawerToggle: PropTypes.func.isRequired, // Función para abrir o cerrar el sidebar
};