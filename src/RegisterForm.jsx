import React, { useState } from 'react';

function RegisterForm({ onSubmit, error }) {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ usuario, clave }); // Pasar los datos al componente padre (App)
  };

  return (
    <div>
      <h1>Registro</h1>
      <form onSubmit={handleSubmit}>
        {/* ... (campos de usuario y contraseña) ... */}
        {error && <div className="error-message">{error}</div>}
        <button type="submit">Registrarse</button>

        <p>
          ¿Ya tienes una cuenta? <button type="button" onClick={() => onSubmit(null)}>Iniciar sesión</button> {/* Pasar null para indicar que se quiere volver al inicio de sesión */}
        </p> 
      </form>
    </div>
  );
}

export default RegisterForm;