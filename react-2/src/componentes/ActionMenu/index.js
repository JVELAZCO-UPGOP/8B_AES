import React, { useState } from "react";
import "./ActionMenu.css";
import Alert from "../Alert";

    function ActionMenu({ cambiarModal = () => {} }) {
    return( 
        <div className="actions-menu">
            <h1>Mascotas</h1>
            <div className= "actions-menu-content"> 
                <button
                type="button" 
                className="btn btn-primary" 
                data-toggle="modal" 
                data-target="#exampleModalCenter"
                onClick={cambiarModal}
                >
                    Agregar
                </button>
                {/* {<Alert  />}  */}
            </div>
        </div>
    );
}

export default ActionMenu;