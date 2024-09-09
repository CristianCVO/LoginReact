import React, { useState } from 'react';
import './App.css';
import logo from './assets/logo.png'; 

function App() {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false); 

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Llamamos a la nueva función ingresar
    await ingresar(); 
  };

  async function ingresar() { 
    const peticion = await fetch('http://localhost:3000/login?usuario=' + usuario + '&clave=' + clave); 

    if (peticion.ok) {
      setLoggedIn(true);
      alert('¡Inicio de sesión exitoso!'); 
    } else {
      alert('Usuario o clave incorrectos');
    }
  }

  return (
    <div className="App">
      {/* Mostrar el formulario de inicio de sesión solo si el usuario NO ha iniciado sesión */}
      {!loggedIn && (
        <div className="login-container">
          <h1>Inicio de sesión</h1>
          <form onSubmit={handleSubmit}>
            <div> 
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
            <div> 
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
        <div className="content-container"> 
          <div className="section-titles"> 
            <a href="https://www.epssura.com/" target="_blank"><h2>Expedientes clínicos</h2></a>
            <a href="https://www.epssura.com/" target="_blank"><h2>Historial</h2></a>
            <a href="https://www.epssura.com/" target="_blank"><h2>Citas</h2></a>
            <a href="https://www.epssura.com/" target="_blank"><h2>Citas agendadas</h2></a>
          </div>

          <div className="logo-container">
            <img src={logo} alt="Logo Salud Agenda" />
          </div>

          {/* ... (contenido de cada apartado) ... */}
        </div>
      )}
    </div>
  );
}

export default App;