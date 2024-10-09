import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Select, MenuItem, InputLabel, FormControl, FormHelperText } from '@mui/material';
import PropTypes from 'prop-types';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { obraSchema, pinturaSchema, publicacionSchema, multimediaSchema } from '../schemas/validationSchemas';
import useLoadData from './useLoadData';
import DynamicFields from './DynamicFields';
import CustomSelect from './CustomSelect';
import dayjs from 'dayjs';

export default function EditModal({ open, handleClose, obra, handleSave }) {
  console.log(obra);
  const fields = obra || {
    titulo: '',
    descripcion: '',
    autor_id: '',
    fecha_creacion: dayjs(), // Formato adecuado para el DatePicker
    ubicacion_id: '',
    palabras_clave: '',
    url_imagen: '',
    adicionales: {},
    tipo_obra: '',
    // Campos adicionales
    detalles: {
      tecnica_id: '',
      estado_conservacion: '',
      dimensiones: '',
      movimiento_id: '',
      editor: '',
      lugar_publicacion: '',
      generos: '',
      idioma: '',
      numero_paginas: '',
      tipo_multimedia: '',
      duracion: '',
      formato: ''
    }
  };

  const { autores, ubicaciones, tecnicas, movimientos } = useLoadData();
  const [formValues, setFormValues] = useState(fields);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    if (name in formValues.detalles) { // Verificar si es un campo de detalles
      setFormValues((prevValues) => ({
        ...prevValues,
        detalles: {
          ...prevValues.detalles,
          [name]: value,
        },
      }));
      console.log(name, value, "2");
    } else {
      setFormValues({ ...formValues, [name]: value || ""});
    }
  };

  const handleDateChange = (date) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      fecha_creacion: date // Guardar como string en el formato adecuado
    }));  };

  const handleFileChange = (e) => {
    const fileName = e.target.files[0].name;
    const filePath = `http://127.0.0.1:8000/static/images/${fileName}`;
    setFormValues({ ...formValues, url_imagen: filePath });
  };

  const validateFields = (updatedValues) => {
    let validationSchema = obraSchema; // Validación general
    if (updatedValues.tipo_obra === 'pintura') {
      console.log("pintura");
      validationSchema = pinturaSchema;
    }
    if (updatedValues.tipo_obra === 'publicacion') validationSchema = publicacionSchema;
    if (updatedValues.tipo_obra === 'multimedia') validationSchema = multimediaSchema;

    const parsedResult = validationSchema.safeParse(updatedValues);
    console.log(parsedResult);
    if (!parsedResult.success) {
      const validationErrors = parsedResult.error.format();
      setErrors(validationErrors); // Mostrar errores en el formulario
      console.log(validationErrors);
      return false;
    }
    
    setErrors({});
    return true;
  };

  const convertEmptyStringsToNull = (obj) => {
    const result = {};
    for (const key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        result[key] = convertEmptyStringsToNull(obj[key]); // Recursión para objetos anidados
      } else {
        result[key] = obj[key] === '' ? null : obj[key]; // Convertir vacío a null
      }
    }
    return result;
  };
  

  const onSave = () => {
    // Formatear fecha
    const updatedValues = {
      ...formValues,
      fecha_creacion: dayjs(formValues.fecha_creacion).format('YYYY-MM-DD'),
    };
    console.log(updatedValues);

    if(validateFields(updatedValues)){
      const formattedValues = convertEmptyStringsToNull(updatedValues);
      console.log(formattedValues);
      handleSave(formattedValues);
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{obra ? 'Editar Obra' : 'Agregar Nueva Obra'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="titulo"
          label="Título"
          fullWidth
          value={formValues.titulo}
          onChange={handleChange}
          error={!!errors.titulo}
          helperText={errors.titulo?._errors?.[0]}
        />
        <TextField
          margin="dense"
          name="descripcion"
          label="Descripción"
          fullWidth
          value={formValues.descripcion}
          onChange={handleChange}
          error={!!errors.descripcion}
          helperText={errors.descripcion?._errors?.[0]}
        />

        <CustomSelect
          label="Autor"
          name="autor_id"
          value={(autores.length > 0) ? formValues.autor_id : ""}
          options={autores}
          handleChange={handleChange}
          error={errors.autor_id}
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Fecha de Creación"
            inputFormat="DD/MM/YYYY"
            value={dayjs(formValues.fecha_creacion)}
            onChange={handleDateChange}
            textField={(params) => <TextField 
              {...params} 
              fullWidth
              margin="dense"
              error={!!errors.fecha_creacion}
              helperText={errors.fecha_creacion?._errors?.[0]}
              />}
          />
        </LocalizationProvider>

        <CustomSelect
          label="Ubicación"
          name="ubicacion_id"
          value={(ubicaciones.length > 0) ? formValues.ubicacion_id : ""}
          options={ubicaciones}
          handleChange={handleChange}
          error={errors.ubicacion_id}
        />

        <TextField
          margin="dense"
          name="palabras_clave"
          label="Palabras Clave"
          fullWidth
          value={formValues.palabras_clave}
          onChange={handleChange}
          error={!!errors.palabras_clave}
          helperText={errors.palabras_clave?._errors?.[0]}
        />

        <TextField
          margin="dense"
          name="url_imagen"
          label="URL de Imagen"
          type="file"
          fullWidth
          onChange={handleFileChange}
          error={!!errors.url_imagen}
          helperText={errors.url_imagen?._errors?.[0]}
        />

        {/* <TextField
          margin="dense"
          name="adicionales"
          label="Adicionales (JSON)"
          fullWidth
          value={formValues.adicionales || ""}
          onChange={handleChange}
        /> */}

        <FormControl fullWidth margin="dense" error={!!errors.tipo_obra}>
          <InputLabel>Tipo de Obra</InputLabel>
          <Select
            name="tipo_obra"
            value={formValues.tipo_obra}
            onChange={handleChange}
          >
            <MenuItem value="pintura">Pintura</MenuItem>
            <MenuItem value="publicacion">Publicación</MenuItem>
            <MenuItem value="multimedia">Multimedia</MenuItem>
          </Select>
          <FormHelperText>{errors.tipo_obra?._errors?.[0]}</FormHelperText>
        </FormControl>

        <DynamicFields
          tipoObra={formValues.tipo_obra}
          formValues={formValues.detalles}
          handleChange={handleChange}
          tecnicas={tecnicas}
          movimientos={movimientos}
          errors={errors.detalles || {}}
        />
        
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
};
