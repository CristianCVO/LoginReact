import React, { useState, useEffect } from 'react';

function UsuariosRegistrados() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await fetch('http://localhost:3000/usuarios');
        if (response.ok) {
          const data = await response.json();
          setUsuarios(data);
        } else {
          console.error('Error al obtener usuarios');
        }
      } catch (error) {
        console.error('Error de red al obtener usuarios:', error);
      }
    };

    fetchUsuarios();
  }, []); 

  const handleEliminarUsuario = async (usuario) => {
    try {
      const response = await fetch(`http://localhost:3000/usuarios/${usuario}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        // Actualizar la lista de usuarios después de eliminar
        setUsuarios(usuarios.filter(u => u.usuario !== usuario));
        alert('Usuario eliminado correctamente');
      } else {
        console.error('Error al eliminar usuario');
      }
    } catch (error) {
      console.error('Error de red al eliminar usuario:', error);
    }
  }

  return (
    <div>
      <h2>Usuarios Registrados</h2>
      <table> 
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Contraseña</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario, index) => (
            <tr key={index}>
              <td>{usuario.usuario}</td>
              <td>*******</td> 
              <td>
                <button onClick={() => handleEliminarUsuario(usuario.usuario)}>Eliminar</button> 
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsuariosRegistrados;