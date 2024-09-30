import { useState }from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import PropTypes from 'prop-types';

export default function EditModal({ open, handleClose, obra, handleSave }) {

  const [formValues, setFormValues] = useState(obra);

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const onSave = () => {
    handleSave(formValues);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{obra ? 'Editar Obra' : 'Agregar Nueva Obra'}</DialogTitle>
      <DialogContent>
        {Object.keys(formValues).map((field) => (
          <TextField
            key={field}
            autoFocus = {field === 'titulo'}
            margin="dense"
            name={field}
            label={field.charAt(0).toUpperCase() + field.slice(1)}
            type="text"
            fullWidth
            value={formValues[field]}
            onChange={handleChange}
          />
        ))}
        {/* Agrega otros campos necesarios */}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">Cancelar</Button>
        <Button onClick={onSave} color="primary">Guardar</Button>
      </DialogActions>
    </Dialog>
  );
}

EditModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  obra: PropTypes.object,
  handleSave: PropTypes.func.isRequired,
}