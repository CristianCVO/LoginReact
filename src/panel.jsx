import React from 'react';
import { Link } from 'react-router-dom'; // Make sure you have React Router installed
import logo from './assets/logo.png'; 

function Panel() {
  return (
    <div className="main-container">
      <h1>Bienvenido al sitio donde organizarás más fácil y rápido tu agenda!</h1>

      <div className="button-container">
        <Link to="/citas-medicas">Citas médicas</Link>
        <Link to="/expedientes-clinicos">Expedientes clínicos</Link>
        <Link to="/citas-agendadas">Citas agendadas</Link>
        <Link to="/historial">Historial</Link>
      </div>

      <div className="logo-container">
        <img src={logo} alt="Logo Salud Agenda" />
      </div>
    </div>
  );
}

export default Panel;