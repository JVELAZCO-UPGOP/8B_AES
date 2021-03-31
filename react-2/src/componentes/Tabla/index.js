import React, {useState} from "react";
import Encabezado from "./Encabezado";
import Fila from "./Fila";
import "./Tabla.css";


function Tabla() {
    const [mascotas, setMascotas] = useState([
        {
            tipo: 'Perro',
            nombre:'Roko', 
            propietarios:'Jorge'
        },
        {
            tipo: 'Gato',
            nombre:'Manchas', 
            propietarios:'Brayan'
        },
    ]);

    const columnas = mascotas.length > 0 ? Object.keys(mascotas[0]): [];
    return(
        <table className="table table-stripped table-hover">
            <Encabezado columnas={columnas} />
            <tbody id="lista-mascotas">
            {mascotas.map((mascota, index) => (
           <Fila mascota={mascota} index={index} />
            ))}
            </tbody>
        </table>
    );
}

export default Tabla;

// import React, { useState } from "react";
// import Encabezado from "./Encabezado";
// import Fila from "./Fila";
// import "./Tabla.css";

// function Tabla({
//   entidades = [],
//   editarEntidad = () => {},
//   eliminarEntidad = () => {},
//   columnas = [],
// }) {
//   return (
//     <table className="table table-stripped table-hover">
//       <Encabezado columnas={columnas} />
//       <tbody id="lista-mascotas">
//         {entidades.map((entidad, index) => (
//           <Fila
//             key={`fila-${index}`}
//             index={index}
//             entidad={entidad}
//             editarEntidad={editarEntidad}
//             eliminarEntidad={eliminarEntidad}
//             columnas={columnas}
//           />
//         ))}
//       </tbody>
//     </table>
//   );
// }

// export default Tabla;