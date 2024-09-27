import { useState } from 'react';
import { IconButton, TextField, Select, MenuItem, Button, Box } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Lupa from '@mui/icons-material/SearchOutlined';
import DeleteIcon from '@mui/icons-material/DeleteRounded';

export default function FilterManager({ obras, setFilteredObras }) {
  const [generalFilter, setGeneralFilter] = useState('');
  const [generalFilterVisible, setGeneralFilterVisible] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState([]);

  const handleAddAdvancedFilter = () => {
    setAdvancedFilters([...advancedFilters, { column: '', operator: 'contiene', value: '', range: false }]);
  };

  const handleAdvancedFilterChange = (index, field, value) => {
    const newFilters = [...advancedFilters];
    newFilters[index][field] = value;
    setAdvancedFilters(newFilters);
  };

  const handleRemoveAdvancedFilter = (index) => {
    setAdvancedFilters(advancedFilters.filter((_, i) => i !== index));
  };

  const getAvailableOperators = (columnType) => {
    switch (columnType) {
      case 'number':
        return ['=', '>', '<'];
      case 'text':
        return ['contiene', 'no contiene', 'comienza con', 'termina con'];
      case 'date':
        return ['antes de', 'después de', 'en', 'entre'];
      default:
        return ['='];
    }
  };

  const getColumnType = (columnName) => {
    if (['id', 'price', 'quantity'].includes(columnName)) {
      return 'number';
    }
    if (['fecha_creacion'].includes(columnName)) {
      return 'date';
    }
    if (['descripcion', 'url_imagen'].includes(columnName)) {
      return 'text';
    }
    return 'text';
  };

  const applyAdvancedFilter = (row, { column, operator, value }) => {
    if (!value) return true;
    const rowValue = row[column];

    switch (operator) {
      case 'contiene':
        return String(rowValue).toLowerCase().includes(value.toLowerCase());
      case 'no contiene':
        return !String(rowValue).toLowerCase().includes(value.toLowerCase());
      case 'comienza con':
        return String(rowValue).toLowerCase().startsWith(value.toLowerCase());
      case 'termina con':
        return String(rowValue).toLowerCase().endsWith(value.toLowerCase());
      case '>':
        return rowValue > value;
      case '<':
        return rowValue < value;
      case '=':
        return String(rowValue) === String(value);
      case 'antes de':
        return new Date(rowValue) < new Date(value);
      case 'después de':
        return new Date(rowValue) > new Date(value);
      case 'en':
        return new Date(rowValue).toDateString() === new Date(value).toDateString();
      case 'entre':
        const [start, end] = value;
        return new Date(rowValue) >= new Date(start) && new Date(rowValue) <= new Date(end);
      default:
        return true;
    }
  };

  const filteredObras = obras.filter(row => {
    const matchesGeneralFilter = Object.values(row).some(value =>
      String(value).toLowerCase().includes(generalFilter.toLowerCase())
    );

    return matchesGeneralFilter && advancedFilters.every(filter => applyAdvancedFilter(row, filter));
  });

  setFilteredObras(filteredObras);

  return (
    <div>
      <IconButton onClick={() => setGeneralFilterVisible(!generalFilterVisible)}>
        <Lupa />
      </IconButton>
      {generalFilterVisible && (
        <Box sx={{ padding: 2, marginTop: 2, border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#f9f9f9', width: '100%' }}>
          <TextField
            variant="outlined"
            size="small"
            value={generalFilter}
            onChange={(e) => setGeneralFilter(e.target.value)}
            placeholder="Ingresa tu búsqueda"
            style={{ marginBottom: '10px', width: '100%' }}
          />
          {advancedFilters.map((filter, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <Select
                value={filter.column}
                onChange={(e) => {
                  handleAdvancedFilterChange(index, 'column', e.target.value);
                  handleAdvancedFilterChange(index, 'value', ''); // Limpiar el valor si cambia la columna
                }}
                style={{ marginRight: '10px' }}
              >
                {obras.length > 0 && Object.keys(obras[0]).map((key) => (
                  <MenuItem value={key} key={key}>
                    {key.replace(/_/g, ' ').replace(/id$/, '').charAt(0).toUpperCase() + key.replace(/_/g, ' ').replace(/id$/, '').slice(1)}
                  </MenuItem>
                ))}
              </Select>
              <Select
                value={filter.operator}
                onChange={(e) => handleAdvancedFilterChange(index, 'operator', e.target.value)}
                style={{ marginRight: '10px' }}
              >
                {getAvailableOperators(getColumnType(filter.column)).map(op => (
                  <MenuItem value={op} key={op}>
                    {op}
                  </MenuItem>
                ))}
              </Select>
              {filter.operator === 'entre' ? (
                <>
                  <TextField
                    variant="outlined"
                    size="small"
                    value={filter.value[0]}
                    onChange={(e) => handleAdvancedFilterChange(index, 'value', [e.target.value, filter.value[1]])}
                    placeholder="Desde"
                    style={{ marginRight: '10px' }}
                  />
                  <TextField
                    variant="outlined"
                    size="small"
                    value={filter.value[1]}
                    onChange={(e) => handleAdvancedFilterChange(index, 'value', [filter.value[0], e.target.value])}
                    placeholder="Hasta"
                    style={{ marginRight: '10px' }}
                  />
                </>
              ) : (
                <TextField
                  variant="outlined"
                  size="small"
                  value={filter.value}
                  onChange={(e) => handleAdvancedFilterChange(index, 'value', e.target.value)}
                  placeholder="Valor"
                  style={{ marginRight: '10px' }}
                />
              )}
              <IconButton onClick={() => handleRemoveAdvancedFilter(index)}>
                <DeleteIcon style={{ color: 'red' }} />
              </IconButton>
            </div>
          ))}
          <Button variant="contained" onClick={handleAddAdvancedFilter} startIcon={<FilterAltIcon />}>
            Filtro Avanzado
          </Button>
        </Box>
      )}
    </div>
  );
}
