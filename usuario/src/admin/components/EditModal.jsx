import { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import PropTypes from 'prop-types';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { getAllAutores, getAllUbicaciones, getAllMovimientos, getAllTecnicas } from '../../api/index.api';
import dayjs from 'dayjs';

export default function EditModal({ open, handleClose, obra, handleSave }) {

  // const fields = obra || {
  //   titulo: '',
  //   descripcion: '',
  //   autor_id: '',
  //   fecha_creacion: dayjs(),
  //   ubicacion_id: '',
  //   palabras_clave: '',
  //   url_imagen: '',
  //   adicionales: '',
  //   tipo_obra: ''
  // };

  const fields = obra || {
    titulo: '',
    descripcion: '',
    autor_id: '',
    fecha_creacion: dayjs(), // Formato adecuado para el DatePicker
    ubicacion_id: '',
    palabras_clave: '',
    url_imagen: '',
    adicionales: '',
    tipo_obra: '',
    // Campos adicionales
    detalles: {
      tecnica: '',
      estado_conservacion: '',
      dimensiones: '',
      movimiento: '',
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

  const [formValues, setFormValues] = useState(fields);
  const [autores, setAutores] = useState([]);
  const [ubicaciones, setUbicaciones] = useState([]);
  const [tecnicas, setTecnicas] = useState([]);
  const [movimientos, setMovimientos] = useState([]);
  const [errors, setErrors] = useState({});

  // Simulación para obtener autores y ubicaciones desde la API
  useEffect(() => {
    // Llamada API para obtener autores
    async function loadAutores(){
      const res = await getAllAutores();
      setAutores(res.data);
    }
    // Llamada API para obtener ubicaciones
    async function loadUbicaciones(){
      const res = await getAllUbicaciones();
      setUbicaciones(res.data);
    }
    // Llamada API para obtener técnicas
    async function loadTecnicas(){
      const res = await getAllTecnicas();
      setTecnicas(res.data);
    }
    // Llamada API para obtener movimientos
    async function loadMovimientos(){
      const res = await getAllMovimientos();
      setMovimientos(res.data);
    }

    loadAutores();
    loadUbicaciones();
    loadTecnicas();
    loadMovimientos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Manejo de cambios en detalles
    if (name in formValues.detalles) {
      setFormValues({
        ...formValues,
        detalles: {
          ...formValues.detalles,
          [name]: value,
        }
      });
    } else {
      setFormValues({ ...formValues, [name]: value });
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

  const validateFields = () => {
    const requiredFields = ['titulo', 'descripcion', 'autor_id', 'fecha_creacion','ubicacion_id', 'palabras_clave', 'url_imagen', 'tipo_obra'];
    let validationErrors = {};

    // Validar campos comunes
    requiredFields.forEach(field => {
      if (!formValues[field]) {
        validationErrors[field] = 'Este campo es requerido';
      }
    });

    // Validar campos específicos según el tipo de obra
    if (formValues.tipo_obra === 'pintura') {
      if (!formValues.detalles.tecnica || !formValues.detalles.estado_conservacion || !formValues.detalles.dimensiones || !formValues.detalles.movimiento) {
        validationErrors.tipo_obra_especifico = 'Debes llenar todos los campos específicos para pinturas';
      }
    } else if (formValues.tipo_obra === 'publicacion') {
      if (!formValues.detalles.editor || !formValues.detalles.lugar_publicacion || !formValues.detalles.generos || !formValues.detalles.idioma || !formValues.detalles.numero_paginas) {
        validationErrors.tipo_obra_especifico = 'Debes llenar todos los campos específicos para publicaciones';
      }
    } else if (formValues.tipo_obra === 'multimedia') {
      if (!formValues.detalles.tipo_multimedia || !formValues.detalles.duracion || !formValues.detalles.formato) {
        validationErrors.tipo_obra_especifico = 'Debes llenar todos los campos específicos para multimedia';
      }
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
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
    if(validateFields()){
      let formattedData = {
        ...formValues,
        fecha_creacion: dayjs(formValues.fecha_creacion).format('YYYY-MM-DD'),  // Formatear antes de enviar// Formatear antes de enviar
    };
    formattedData = convertEmptyStringsToNull(formattedData);
    handleSave(formattedData);
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
          helperText={errors.titulo}
        />
        <TextField
          margin="dense"
          name="descripcion"
          label="Descripción"
          fullWidth
          value={formValues.descripcion}
          onChange={handleChange}
          error={!!errors.descripcion}
          helperText={errors.descripcion}
        />

        <FormControl fullWidth margin="dense">
          <InputLabel>Autor</InputLabel>
          <Select
            name="autor_id"
            value={(autores.length > 0) ? formValues.autor_id : ''}
            onChange={handleChange}
            error={!!errors.autor_id}
          >
            {autores.map((autor) => (
              <MenuItem key={autor.id} value={autor.id}>
                {autor.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

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
              />}
          />
        </LocalizationProvider>

        <FormControl fullWidth margin="dense">
          <InputLabel>Ubicación</InputLabel>
          <Select
            name="ubicacion_id"
            value={(ubicaciones.length > 0) ? formValues.ubicacion_id : ""}
            onChange={handleChange}
            error={!!errors.ubicacion_id}
          >
            {ubicaciones.map((ubicacion) => (
              <MenuItem key={ubicacion.id} value={ubicacion.id}>
                {ubicacion.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          margin="dense"
          name="palabras_clave"
          label="Palabras Clave"
          fullWidth
          value={formValues.palabras_clave}
          onChange={handleChange}
          error={!!errors.palabras_clave}
        />

        <TextField
          margin="dense"
          name="url_imagen"
          label="URL de Imagen"
          type="file"
          fullWidth
          onChange={handleFileChange}
          error={!!errors.url_imagen}
        />

        <TextField
          margin="dense"
          name="adicionales"
          label="Adicionales (JSON)"
          fullWidth
          value={formValues.adicionales || ""}
          onChange={handleChange}
        />

        <FormControl fullWidth margin="dense">
          <InputLabel>Tipo de Obra</InputLabel>
          <Select
            name="tipo_obra"
            value={formValues.tipo_obra}
            onChange={handleChange}
            error={!!errors.tipo_obra}
          >
            <MenuItem value="pintura">Pintura</MenuItem>
            <MenuItem value="publicacion">Publicación</MenuItem>
            <MenuItem value="multimedia">Multimedia</MenuItem>
          </Select>
        </FormControl>
        {formValues.tipo_obra === 'pintura' && (
          <>
            <FormControl fullWidth margin="dense">
              <InputLabel>Técnica</InputLabel>
              <Select
                name="tecnica"
                value={(tecnicas.length > 0) ? (formValues.detalles.tecnica || "") : ""}
                onChange={handleChange}
              >
                {tecnicas.map((tecnica) => (
                  <MenuItem key={tecnica.id} value={tecnica.nombre}>
                    {tecnica.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              name="estado_conservacion"
              label="Estado de Conservación"
              fullWidth
              value={formValues.detalles.estado_conservacion || ""}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="dimensiones"
              label="Dimensiones"
              fullWidth
              value={formValues.detalles.dimensiones || ""}
              onChange={handleChange}
            />
            <FormControl fullWidth margin="dense">
              <InputLabel>Movimiento</InputLabel>
              <Select
                name="movimiento"
                value={(movimientos.length > 0) ? formValues.detalles.movimiento || "" : ""}
                onChange={handleChange}
              >
                {movimientos.map((movimiento) => (
                  <MenuItem key={movimiento.id} value={movimiento.nombre}>
                    {movimiento.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </>
        )}

        {formValues.tipo_obra === 'publicacion' && (
          <>
            <TextField
              margin="dense"
              name="editor"
              label="Editor"
              fullWidth
              value={formValues.detalles.editor || ""}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="lugar_publicacion"
              label="Lugar de Publicación"
              fullWidth
              value={formValues.detalles.lugar_publicacion || ""}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="generos"
              label="Géneros"
              fullWidth
              value={formValues.detalles.generos || ""}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="idioma"
              label="Idioma"
              fullWidth
              value={formValues.detalles.idioma || ""}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="numero_paginas"
              label="Número de Páginas"
              fullWidth
              value={formValues.detalles.numero_paginas || ""}
              onChange={handleChange}
            />
          </>
        )}

        {formValues.tipo_obra === 'multimedia' && (
          <>
            <TextField
              margin="dense"
              name="tipo_multimedia"
              label="Tipo de Multimedia"
              fullWidth
              value={formValues.detalles.tipo_multimedia || ""}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="duracion"
              label="Duración"
              fullWidth
              value={formValues.detalles.duracion || ""}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="formato"
              label="Formato"
              fullWidth
              value={formValues.detalles.formato || ""}
              onChange={handleChange}
            />
          </>
        )}
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
