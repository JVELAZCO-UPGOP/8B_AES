import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

function Nav() {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <Link className="navbar-brand" to="/">
      Veterinaria Crazy
      </Link>
      <div className="navbar-right" id="navbarColor03">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/">
              Mascotas<span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/veterinarias">
            Médico Veterinario
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/duenos">
            Propietarios
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/consultas">
              Consultas
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
