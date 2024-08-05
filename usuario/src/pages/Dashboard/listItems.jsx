import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Brush as BrushIcon,
  Collections as CollectionsIcon,
  Gesture as GestureIcon,
  LocalFlorist as LocalFloristIcon,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

export const mainListItems = (
  <div>
    <ListItem button component={Link} to="/">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button component={Link} to="/obras">
      <ListItemIcon>
        <BrushIcon />
      </ListItemIcon>
      <ListItemText primary="Obras" />
    </ListItem>
    <ListItem button component={Link} to="/album">
      <ListItemIcon>
        <CollectionsIcon />
      </ListItemIcon>
      <ListItemText primary="Album" />
    </ListItem>
    <ListItem button component={Link} to="/obras">
      <ListItemIcon>
        <GestureIcon />
      </ListItemIcon>
      <ListItemText primary="Obras" />
    </ListItem>
    <ListItem button component={Link} to="/extra">
      <ListItemIcon>
        <LocalFloristIcon />
      </ListItemIcon>
      <ListItemText primary="Extra" />
    </ListItem>
  </div>
);
