import React, {useState} from "react";


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
    ])
    return(
        <table className="table table-stripped table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Tipo</th>
                        <th scope="col">Nombre de la Mascota</th>
                        <th scope="col">Propietarios</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
            <tbody id="lista-mascotas">
            {" "}
            {mascotas.map((mascota, index) => (
            <tr>
                <th scope="row">${index}</th>
                <td>${mascota.tipo}</td>
                <td>${mascota.nombre}</td>
                <td>${mascota.propietarios}</td>
                <td>
                    <div class="btn-group" role="group" aria-label="Basic example">
                        <button type="button" class="btn btn-info editar"><i class="fas fa-edit"></i></button>
                        <button type="button" class="btn btn-danger eliminar"><i class="far fa-trash-alt"></i></button>
                    </div>
                </td>
            </tr>
            ))}
            </tbody>
        </table>
    );
}

export default Tabla;