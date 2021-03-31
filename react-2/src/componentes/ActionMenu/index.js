import React, { useState } from "react";
import "./ActionMenu.css";
import Alert from "../Alert";

function ActionMenu() {
    const [mostrarAlerta, setMostrarAlerta] =useState(false);
    const alertSwitch = () => setMostrarAlerta(!mostrarAlerta)
    return( 
        <div className="actions-menu">
            <h1>Mascotas</h1>
            <div className= "actions-menu-content"> 
                <button
                type="button" 
                className="btn btn-primary" 
                data-toggle="modal" 
                data-target="#exampleModalCenter"
                onClick={alertSwitch}
                >
                    Agregar
                </button>
                {mostrarAlerta && <Alert alertSwitch={alertSwitch} />}
            </div>
        </div>
    );
}

export default ActionMenu;