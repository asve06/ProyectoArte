import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Dashboard as DashboardIcon, Brush as BrushIcon, Collections as CollectionsIcon, } from '@mui/icons-material';
import { Link } from 'react-router-dom';

export const mainListItemsAdmin = (
  <div>
    <ListItemButton component={Link} to="/admin/dashboard">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton component={Link} to="/admin/obras">
      <ListItemIcon>
        <BrushIcon />
      </ListItemIcon>
      <ListItemText primary="Obras" />
    </ListItemButton>
    <ListItemButton component={Link} to="/admin/album">
      <ListItemIcon>
        <CollectionsIcon />
      </ListItemIcon>
      <ListItemText primary="Album" />
    </ListItemButton>
  </div>
);
