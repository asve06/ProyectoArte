import { TextField } from '@mui/material';
import PropTypes from 'prop-types';
import CustomSelect from './CustomSelect';

export default function DynamicFields({tipoObra, formValues, handleChange, tecnicas, movimientos, errors}){
  console.log(errors)
  switch(tipoObra){
    case 'pintura':
      return (
        <>
          <CustomSelect
            label="Tecnica"
            name="tecnica_id"
            value={(tecnicas.length > 0) ? formValues.tecnica_id : ""}
            options={tecnicas}
            handleChange={handleChange}
            error={errors.tecnica_id}
          />

          <TextField
            margin="dense"
            name="estado_conservacion"
            label="Estado de Conservación"
            fullWidth
            value={formValues.estado_conservacion || ""}
            onChange={handleChange}
            error={!!errors.estado_conservacion}
            helperText={errors.estado_conservacion?._errors?.[0]}
          />

          <TextField
            margin="dense"
            name="dimensiones"
            label="Dimensiones"
            fullWidth
            value={formValues.dimensiones || ""}
            onChange={handleChange}
            error={!!errors.dimensiones}
            helperText={errors.dimensiones?._errors?.[0]}
          />

          <CustomSelect
            label="Movimiento"
            name="movimiento_id"
            value={(movimientos.length > 0) ? formValues.movimiento_id : ""}
            options={movimientos}
            handleChange={handleChange}
            error={errors.movimiento_id}
          />
          {/* <FormControl fullWidth margin="dense">
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
          </FormControl> */}
        </>
      );

    case 'publicacion':
      return(
        <>
          <TextField
            margin="dense"
            name="editor"
            label="Editor"
            fullWidth
            value={formValues.editor || ""}
            onChange={handleChange}
            error={!!errors.editor}
            helperText={errors.editor?._errors?.[0]}
          />

          <TextField
            margin="dense"
            name="lugar_publicacion"
            label="Lugar de Publicación"
            fullWidth
            value={formValues.lugar_publicacion || ""}
            onChange={handleChange}
            error={!!errors.lugar_publicacion}
            helperText={errors.lugar_publicacion?._errors?.[0]}
          />

          <TextField
            margin="dense"
            name="generos"
            label="Géneros"
            fullWidth
            value={formValues.generos || ""}
            onChange={handleChange}
            error={!!errors.generos}
            helperText={errors.generos?._errors?.[0]}
          />

          <TextField
            margin="dense"
            name="idioma"
            label="Idioma"
            fullWidth
            value={formValues.idioma || ""}
            onChange={handleChange}
            error={!!errors.idioma}
            helperText={errors.idioma?._errors?.[0]}
          />

          <TextField
            margin="dense"
            name="numero_paginas"
            label="Número de Páginas"
            fullWidth
            value={formValues.numero_paginas || ""}
            onChange={handleChange}
            error={!!errors.numero_paginas}
            helperText={errors.numero_paginas?._errors?.[0]}
          />
        </>
      );

    case 'multimedia':
      return(
        <>
          <TextField
            margin="dense"
            name="tipo_multimedia"
            label="Tipo de Multimedia"
            fullWidth
            value={formValues.tipo_multimedia || ""}
            onChange={handleChange}
            error={!!errors.tipo_multimedia}
            helperText={errors.tipo_multimedia?._errors?.[0]}
          />
          <TextField
            margin="dense"
            name="duracion"
            label="Duración"
            fullWidth
            value={formValues.duracion || ""}
            onChange={handleChange}
            error={!!errors.duracion}
            helperText={errors.duracion?._errors?.[0]}
          />
          <TextField
            margin="dense"
            name="formato"
            label="Formato"
            fullWidth
            value={formValues.formato || ""}
            onChange={handleChange}
            error={!!errors.formato}
            helperText={errors.formato?._errors?.[0]}
          />
        </>
      );
  }
}

DynamicFields.propTypes = {
  tipoObra: PropTypes.string.isRequired,
  formValues: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  tecnicas: PropTypes.array.isRequired,
  movimientos: PropTypes.array.isRequired,
  errors: PropTypes.object,
}