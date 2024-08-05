import React from 'react';
import Layout from './Dashboard/Layout';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';

//Aqui debemos conectarlo con la bd
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
];

// Crear datos de la tabla
const rows = [
  {
    id: 1,
    titulo: 'Sol radiante',
    fecha_creacion: '2024-07-24',
    autor: 'Enrique Tábara',
    dimensiones: '60x700',
    categoria: 'Pintura',
    ubicacion: 'Francia',
    tecnica: 'Puntillismo',
    movimiento: 'Realismo',
    estado_conservacion: 'Buena',
    descripcion: 'Sol radiante es una obra de un sol radiante',
    adicionales: 'Obra'
  }
];

// Componente de la tabla con diseño sticky
export default function StickyHeadTable() {
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
    <Layout>
      <Paper sx={{ width: '100%', overflow: 'hidden', mt: 2 }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
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
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
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
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Layout>
  );
}
