import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Dashboard as DashboardIcon, Brush as BrushIcon, Collections as CollectionsIcon, Gesture as GestureIcon, LocalFlorist as LocalFloristIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';

export const mainListItems = (
  <div>
    <ListItem Button component={Link} to="/">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem Button component={Link} to="/obras">
      <ListItemIcon>
        <BrushIcon />
      </ListItemIcon>
      <ListItemText primary="Obras" />
    </ListItem>
    <ListItem Button component={Link} to="/album">
      <ListItemIcon>
        <CollectionsIcon />
      </ListItemIcon>
      <ListItemText primary="Album" />
    </ListItem>
    <ListItem Button component={Link} to="/obras">
      <ListItemIcon>
        <GestureIcon />
      </ListItemIcon>
      <ListItemText primary="Obras" />
    </ListItem>
    <ListItem Button component={Link} to="/signin">
      <ListItemIcon>
        <LocalFloristIcon />
      </ListItemIcon>
      <ListItemText primary="Extra-SignIn" />
    </ListItem>
  </div>
);
