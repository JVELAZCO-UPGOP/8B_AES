import React from "react";
import Nav from "./componentes/Nav";
import ActionMenu from "./componentes/ActionMenu";
import Tabla from "./componentes/Tabla";

function Mascotas (){


    return(  
            <>     
                <div className="container">
                    <Nav/>
                    <ActionMenu/>
                    <Tabla/>
                </div>
            </>
    );
}

export default Mascotas;
