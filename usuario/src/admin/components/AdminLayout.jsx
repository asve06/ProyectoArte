import PropTypes from 'prop-types';

function AdminLayout({ children }) {
  return (
    <div style={{ display: 'flex' }}>
      Hola
      <div style={{ flexGrow: 1 }}>
        Hello
        <main>{children}</main>
      </div>
    </div>
  );
}

export default AdminLayout;

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired, // children es un nodo requerido para renderizar
}