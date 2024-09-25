import React, { useState } from 'react';
import './App.css';
import logo from './assets/logo.png'; 
import UsuariosRegistrados from './usuariosRegistrados';

function App() {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false); 
  const [showRegister, setShowRegister] = useState(false); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    await ingresar(); 
  };

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();

    console.log("Datos de registro enviados:", { usuario, clave }); 

    try {
      const peticion = await fetch('http://localhost:3000/registro?usuario=' + usuario + '&clave=' + clave, { credentials: 'include' });

      if (peticion.ok) {
        alert("Usuario registrado");
        setShowRegister(false); 
      } else {
        const errorData = await peticion.json(); 
        alert('Error al registrar: ' + (errorData.error || 'Usuario Registrado')); 
      }
    } catch (error) {
      console.error('Error de red durante el registro:', error);
      alert('Usuario creado, por favor inicia sesion con tu cuenta.');
    }
  };

  async function ingresar() { 
    console.log("Datos de inicio de sesión enviados:", { usuario, clave }); 

    try {
      const peticion = await fetch('http://localhost:3000/login?usuario=' + usuario + '&clave=' + clave);

      if (peticion.ok) {
        setLoggedIn(true);
        alert('¡Inicio de sesión exitoso!'); 
      } else {
        const errorData = await peticion.json(); 
        alert('Error al iniciar sesión: ' + (errorData.error || 'Usuario o clave incorrectos')); 
      }
    } catch (error) {
      console.error('Error de red durante el inicio de sesión:', error);
      alert('Hubo un problema al iniciar sesión. Por favor, inténtalo de nuevo más tarde.');
    }
  }

  return (
    <div className="App">
      {/* Mostrar el formulario de inicio de sesión solo si el usuario NO ha iniciado sesión */}
      {!loggedIn && (
        <div className="login-container">

          {/* Mostrar el botón "Registrarse" si no se muestra el formulario de registro */}
          {!showRegister && (
            <button type="button" onClick={() => setShowRegister(true)}>Registrarse</button>
          )}

          {/* Mostrar el formulario de registro solo si showRegister es true */}
          {showRegister && (
            <div>
              <h1>Registro</h1>
              <form onSubmit={handleRegisterSubmit}>
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
                <button type="submit">Registrarse</button>

                {/* Botón o enlace para volver al inicio de sesión */}
                <p>
                  ¿Ya tienes una cuenta? <button type="button" onClick={() => setShowRegister(false)}>Iniciar sesión</button>
                </p> 
              </form>
            </div>
          )}

          {/* Mostrar el formulario de inicio de sesión solo si NO se muestra el formulario de registro */}
          {!showRegister && (
            <>
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
            </>
          )}

          <div className="logo-container">
            <img src={logo} alt="Logo Salud Agenda" />
          </div>
        </div>
      )}

      {/* Mostrar los apartados solo si el usuario HA iniciado sesión */}
      {loggedIn && (
        <div className="content-container"> 
          <div className="main-content"> {/* Nueva división para el contenido principal */}
            <div className="section-titles"> 
              <button>
                <a href="https://www.epssura.com/" target="_blank">
                  <h2>Citas</h2>
                </a>
              </button>

              <button>
                <a href="https://www.epssura.com/" target="_blank">
                  <h2>Citas agendadas</h2>
                </a>
              </button>
            </div>

            <div className="logo-container">
              <img src={logo} alt="Logo Salud Agenda" />
            </div>

            {/* ... (contenido de cada apartado) ... */}
          </div>

          <div className="usuarios-registrados"> 
            <UsuariosRegistrados /> 
          </div>
        </div>
      )}
    </div>
  );
}

export default App;