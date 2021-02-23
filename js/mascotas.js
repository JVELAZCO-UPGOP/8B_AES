
const tipo = document.getElementById('tipo'); //almacenar las variables
const nombre = document.getElementById('nombre'); 
const propietarios = document.getElementById('propietarios'); 
const indice = document.getElementById('indice'); 
const form = document.getElementById('form'); 
const btnGuardar = document.getElementById('btn-guardar'); 

const listaMascotas = document.getElementById('lista-mascotas'); 

let mascotas=[
    {
        tipo:"Gato",
        nombre:"Michis",
        propietarios:"Andrea"

    },
    {
        tipo:"Perro",
        nombre:"Tobby",
        propietarios:"Juan"

    }
];


//Renderizar variable Mascotas en el HTML

function listarMascotas(){//ejecute
    const htmlMascotas = mascotas.map((mascota, index)=>`<tr>
        <th scope="row">${index} </th>
        <td>${mascota.tipo}</td>
        <td>${mascota.nombre}</td>
        <td>${mascota.propietarios}</td>
        <td><!--Votones de editar y eliminar datos-->
        <div class="btn-group" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-info editar" ><i class="far fa-edit"></i></button>
            <button type="button" class="btn btn-danger"><i class="far fa-trash-alt"></i></button>
        </div>
        </td>
    </tr>`).join("");
    listaMascotas.innerHTML=htmlMascotas;//esto limpia el todo el contenido de mascotas
    Array.from(document.getElementsByClassName("editar")).forEach((botonEditar, index)=>botonEditar.onclick = editar(index))

}

function enviarDatos(evento){
    evento.preventDefault();
    const datos = {
        tipo: tipo.value,
        nombre: nombre.value,
        propietarios: propietarios.value
    };
    const accion=btnGuardar.innerHTML;
    switch(accion){
        case 'Editar':
            //editar
            mascotas[indice.value]=datos
            break;
            default:
                //crear
                mascotas.push(datos);
            break;
    }

    listarMascotas();//ejecutalo
    resetModal();
}

function editar(index) {
    return function cuandohagoclick(){
        btnGuardar.innerHTML='Editar'
        $('#exampleModalCenter').modal('toggle')
        const mascota=mascotas[index];
        nombre.value=mascota.nombre;
        propietarios.value=mascota.propietarios;
        tipo.value=mascota.tipo;
        indice.value=index;
    }
}

function resetModal(){
    nombre.value='';
    propietarios.value='';
    tipo.value=mascota='';
    indice.value='';
    btnGuardar.innerHTML='Crear'
}

listarMascotas();

form.onsubmit = enviarDatos;
btnGuardar.onclick = enviarDatos;