import React from "react";
import  "./Nav.css";

function Nav() {
    return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
            <a className="navbar-brand" href="#">Veterinaria Crazy Dog</a>
            {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor03"
            aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button> */}
        <div className="collapse navbar-collapse" id="navbarColor03"> 
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="/index.html">Mascotas</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="/medicoveterinario.html"> Médico Veterinario</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="/consultas.html">Consultas</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="/duenos.html">Propietarios</a>
                    </li>
                </ul>
            <form className="form-inline">
                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
                <button className="btn btn-outline-primary my-2 my-sm-0" type="submit">Buscar</button>
            </form>
        </div>
    </nav>
    );
}

export default Nav;