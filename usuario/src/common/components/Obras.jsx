// Obras.js
import { useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, IconButton, TextField, Select, MenuItem, Button, Box } from '@mui/material';
import { getAllObras } from '../../api/obras.api';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Lupa from '@mui/icons-material/SearchOutlined';
import DeleteIcon from '@mui/icons-material/DeleteRounded';
import { FilterManager } from './FilterManager'; 

export default function Obras() {
  const [obras, setObras] = useState([]);
  const [sortModel, setSortModel] = useState({ field: '', direction: 'asc' });
  const [filterManager] = useState(new FilterManager());

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

  const filteredObras = filterManager.filterObras(obras);

  const sortedObras = filteredObras.slice().sort((a, b) => {
    if (!sortModel.field) return 0;
    if (sortModel.direction === 'asc') {
      return a[sortModel.field] > b[sortModel.field] ? 1 : -1;
    } else {
      return a[sortModel.field] < b[sortModel.field] ? 1 : -1;
    }
  });

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
                .filter((key) => key !== 'id')
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
            </TableRow>
          </TableHead>
<TableBody>
  {sortedObras
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((row) => (
      <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
        {/* Muestra la columna ID al inicio */}
        <TableCell>{row.id}</TableCell>
        {/* para no repetir la columna */}
        {Object.keys(row).filter(key => key !== 'id').map((key) => {
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
      </TableRow>
    ))}
</TableBody>

        </Table>
      </TableContainer>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={() => filterManager.toggleGeneralFilterVisibility()}>
            <Lupa />
          </IconButton>
          {filterManager.generalFilterVisible && (
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
                value={filterManager.generalFilter}
                onChange={(e) => filterManager.setGeneralFilter(e.target.value)}
                placeholder="Ingresa tu busqueda"
                style={{ marginBottom: '10px', width: '100%' }}
              />
              {filterManager.advancedFilters.map((filter, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                  <Select
                    value={filter.column}
                    onChange={(e) => {
                      filterManager.updateAdvancedFilter(index, 'column', e.target.value);
                      filterManager.updateAdvancedFilter(index, 'value', ''); // Limpiar el valor si cambia la columna
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
                    onChange={(e) => filterManager.updateAdvancedFilter(index, 'operator', e.target.value)}
                    style={{ marginRight: '10px' }}
                  >
                    {filterManager.getAvailableOperators(filterManager.getColumnType(filter.column)).map(op => (
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
                        onChange={(e) => filterManager.updateAdvancedFilter(index, 'value', [e.target.value, filter.value[1]])}
                        placeholder="Desde"
                        style={{ marginRight: '10px' }}
                      />
                      <TextField
                        variant="outlined"
                        size="small"
                        value={filter.value[1]}
                        onChange={(e) => filterManager.updateAdvancedFilter(index, 'value', [filter.value[0], e.target.value])}
                        placeholder="Hasta"
                        style={{ marginRight: '10px' }}
                      />
                    </>
                  ) : (
                    <TextField
                      variant="outlined"
                      size="small"
                      value={filter.value}
                      onChange={(e) => filterManager.updateAdvancedFilter(index, 'value', e.target.value)}
                      placeholder="Valor"
                      style={{ marginRight: '10px' }}
                    />
                  )}
                  <IconButton onClick={() => filterManager.removeAdvancedFilter(index)}>
                    <DeleteIcon style={{ color: 'red' }} />
                  </IconButton>
                </div>
              ))}
              <Button variant="contained" onClick={() => filterManager.addAdvancedFilter()} startIcon={<FilterAltIcon />}>
                Filtro Avanzado
              </Button>
            </Box>
          )}
        </div>

        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={filteredObras.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </Paper>
  );
}
