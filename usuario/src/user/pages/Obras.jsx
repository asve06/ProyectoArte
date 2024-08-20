import React, { useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { getAllObras } from '../../api/obras.api';

const columns = [
  { id: 'id', label: 'ID', minWidth: 50 },
  { id: 'titulo', label: 'Título', minWidth: 150 },
  { id: 'fecha_creacion', label: 'Fecha de Creación', minWidth: 150 },
  { id: 'autor', label: 'Autor', minWidth: 150 },
  { id: 'dimensiones', label: 'Dimensiones', minWidth: 100 },
  { id: 'categoria', label: 'Categoría', minWidth: 100 },
  { id: 'ubicacion', label: 'Ubicación', minWidth: 100 },
  { id: 'tecnica', label: 'Técnica', minWidth: 100 },
  { id: 'movimiento', label: 'Movimiento', minWidth: 100 },
  { id: 'estado_conservacion', label: 'Estado de Conservación', minWidth: 150 },
  { id: 'descripcion', label: 'Descripción', minWidth: 200 },
  { id: 'adicionales', label: 'Adicionales', minWidth: 100 },
  { id: 'archivo', label: 'Archivo', minWidth: 100 },
];

// Componente de la tabla con diseño sticky
export default function StickyHeadTable() {
  
  const [obras, setObras] = useState([]);

  useEffect(() => {
    async function loadObras() {
      const res = await getAllObras();
      setObras(res.data);
    }
    loadObras();
  }, []);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
      <Paper sx={{ width: '100%', overflow: 'hidden', mt: 2 }}>
        <TableContainer sx={{ maxHeight: 700 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map( (column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {obras
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                            {column.id === 'archivo' ? (
                              value ? (
                                <>
                                  {value.endsWith('.pdf') ? (
                                    // Para PDF, usa <embed> para mostrar el archivo
                                    <div>
                                      <embed src={value} type="application/pdf" width="100px" height="100px" />
                                      <br />
                                      <a href={value} target="_blank" rel="noopener noreferrer">
                                        Ver Archivo
                                      </a>
                                    </div>
                                  ) : (
                                    // Para imágenes, usa <img> para mostrar la imagen
                                    <div>
                                      <img src={value} alt="Archivo" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                                      <br />
                                      <a href={value} target="_blank" rel="noopener noreferrer">
                                        Ver Archivo
                                      </a>
                                    </div>
                                  )}
                                </>
                              ) : (
                                'No Disponible'
                              )
                            ) : (
                              value
                            )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={obras.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
  );
}
