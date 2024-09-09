import React, { useState } from 'react';
import './App.css';
import logo from './assets/logo.png'; 

function App() {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false); 

  const handleSubmit = (event) => {
    event.preventDefault();

    if (usuario === 'admin' && clave === 'admin') {
      setLoggedIn(true); 
      alert('¡Ingresaste correctamente!');
    } else {
      setError('Usuario y/o contraseña incorrectas!'); 
    }
  };

  return (
    <div className="App">
      {/* Mostrar el formulario de inicio de sesión solo si el usuario NO ha iniciado sesión */}
      {!loggedIn && (
        <div className="login-container">
          <h1>Inicio de sesión</h1>
          <form onSubmit={handleSubmit}>
            <div> {/* Campo de usuario */}
              <label htmlFor="usuario">Usuario:</label>
              <input
                type="text"
                name="usuario"
                id="usuario"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                required
              />
            </div>
            <div> {/* Campo de contraseña */}
              <label htmlFor="clave">Clave:</label>
              <input
                type="password"
                name="clave"
                id="clave"
                value={clave}
                onChange={(e) => setClave(e.target.value)}
                required
              />
            </div>
            {error && <div className="error-message">{error}</div>} 
            <button type="submit">Ingresar</button>
          </form>

          <div className="logo-container">
            <img src={logo} alt="Logo Salud Agenda" />
          </div>
        </div>
      )}

      {/* Mostrar los apartados solo si el usuario HA iniciado sesión */}
      {loggedIn && (
        <div>
          <h2>Expedientes clínicos</h2>
          <h2>Historial</h2>
          <h2>Citas</h2>
          <h2>Citas agendadas</h2>
          {/* ... (contenido de cada apartado) ... */}
        </div>
      )}
    </div>
  );
}

export default App;