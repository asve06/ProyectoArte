import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Dashboard as DashboardIcon, Brush as BrushIcon, Collections as CollectionsIcon, Gesture as GestureIcon, } from '@mui/icons-material';
import { Link } from 'react-router-dom';

export const mainListItems = (
  <div>
    <ListItemButton component={Link} to="/">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton component={Link} to="/obras">
      <ListItemIcon>
        <BrushIcon />
      </ListItemIcon>
      <ListItemText primary="Obras" />
    </ListItemButton>
    <ListItemButton component={Link} to="/album">
      <ListItemIcon>
        <CollectionsIcon />
      </ListItemIcon>
      <ListItemText primary="Album" />
    </ListItemButton>
    <ListItemButton component={Link} to="/obras">
      <ListItemIcon>
        <GestureIcon />
      </ListItemIcon>
      <ListItemText primary="Obras" />
    </ListItemButton>
  </div>
);
