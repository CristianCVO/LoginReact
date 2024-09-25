import React, { useState } from 'react';

function LoginForm({ onSubmit, error }) {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ usuario, clave }); // Pasar los datos al componente padre (App)
  };

  return (
    <>
      <h1>Inicio de sesión</h1>
      <form onSubmit={handleSubmit}>
        {/* ... (campos de usuario y contraseña) ... */}
        {error && <div className="error-message">{error}</div>} 
        <button type="submit">Ingresar</button>
      </form>
    </>
  );
}

export default LoginForm;