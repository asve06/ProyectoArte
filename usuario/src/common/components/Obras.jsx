import { useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, IconButton, TextField, Select, MenuItem, Button, Box } from '@mui/material';
import { getAllObras } from '../../api/obras.api';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Lupa from '@mui/icons-material/SearchOutlined';
import DeleteIcon from '@mui/icons-material/DeleteRounded';
import EditIcon from '@mui/icons-material/Edit';

export default function StickyHeadTable() {
  const [obras, setObras] = useState([]);
  const [sortModel, setSortModel] = useState({ field: '', direction: 'asc' });
  const [generalFilter, setGeneralFilter] = useState('');
  const [generalFilterVisible, setGeneralFilterVisible] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState([]);

  useEffect(() => {
    async function loadObras() {
      const res = await getAllObras();
      setObras(res.data);
    }
    loadObras();
  }, []);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSort = (columnId) => {
    const isAsc = sortModel.field === columnId && sortModel.direction === 'asc';
    setSortModel({ field: columnId, direction: isAsc ? 'desc' : 'asc' });
  };

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
    if (['price', 'quantity'].includes(columnName)) {
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

  const sortedObras = filteredObras.slice().sort((a, b) => {
    if (!sortModel.field) return 0;
    if (sortModel.direction === 'asc') {
      return a[sortModel.field] > b[sortModel.field] ? 1 : -1;
    } else {
      return a[sortModel.field] < b[sortModel.field] ? 1 : -1;
    }
  });

  const handleEdit = (id) => {
    // Lógica para editar una obra
    console.log(`Editando obra con ID: ${id}`);
  };

  const handleDelete = (id) => {
    // Lógica para eliminar una obra
    console.log(`Eliminando obra con ID: ${id}`);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', mt: 2 }}>
      <TableContainer sx={{ maxHeight: 700, minHeight: '500px' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={sortModel.field === 'id'}
                  direction={sortModel.direction}
                  onClick={() => handleSort('id')}
                >
                  ID
                </TableSortLabel>
              </TableCell>
              {obras.length > 0 && Object.keys(obras[0])
                .filter(key => key !== 'id')
                .map((key) => (
                  <TableCell key={key}>
                    <TableSortLabel
                      active={sortModel.field === key}
                      direction={sortModel.direction}
                      onClick={() => handleSort(key)}
                    >
                      {key.replace(/_/g, ' ').replace(/id$/, '').charAt(0).toUpperCase() + key.replace(/_/g, ' ').replace(/id$/, '').slice(1)}
                    </TableSortLabel>
                  </TableCell>
                ))}
              <TableCell>Opciones</TableCell> 
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedObras
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  {Object.keys(row)
                    .filter(key => key !== 'id')
                    .map((key) => {
                      const value = row[key];
                      return (
                        <TableCell key={key}>
                          {key === 'url_imagen' ? (
                            value ? (
                              <div>
                                <img 
                                  src={value} 
                                  alt="Obra" 
                                  style={{ maxWidth: '100px', maxHeight: '90px' }} 
                                />
                                <br />
                                <a href={value} target="_blank" rel="noopener noreferrer">
                                  Ver Archivo
                                </a>
                              </div>
                            ) : (
                              'No Disponible'
                            )
                          ) : (
                            typeof value === 'object' ? JSON.stringify(value) : value
                          )}
                        </TableCell>
                      );
                    })}
                  <TableCell> {/* Botones de opciones */}
                    <IconButton onClick={() => handleEdit(row.id)}>
                      <EditIcon color="primary" />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(row.id)}>
                      <DeleteIcon color="primary" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={() => setGeneralFilterVisible(!generalFilterVisible)}>
            <Lupa />
          </IconButton>
          {generalFilterVisible && (
            <Box
              sx={{
                padding: 2,
                marginTop: 2,
                border: '1px solid #ccc',
                borderRadius: '8px',
                backgroundColor: '#f9f9f9',
                width: '100%',
              }}
            >
              <TextField
                variant="outlined"
                size="small"
                value={generalFilter}
                onChange={(e) => setGeneralFilter(e.target.value)}
                placeholder="Ingresa tu busqueda"
                style={{ marginBottom: '10px', width: '100%' }}
              />
              {advancedFilters.map((filter, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                  <Select
                    value={filter.column}
                    onChange={(e) => {
                      handleAdvancedFilterChange(index, 'column', e.target.value);
                      handleAdvancedFilterChange(index, 'value', ''); // Limpia el valor si cambia la columna
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

        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={sortedObras.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </Paper>
  );
}
