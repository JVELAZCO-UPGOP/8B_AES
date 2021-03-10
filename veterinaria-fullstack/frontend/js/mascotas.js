
const tipo = document.getElementById('tipo'); //almacenar las variables
const nombre = document.getElementById('nombre'); 
const propietarios = document.getElementById('propietarios'); 
const indice = document.getElementById('indice'); 
const form = document.getElementById('form'); 
const btnGuardar = document.getElementById('btn-guardar'); 
const btnEliminar = document.getElementById('btn-eliminar'); 
const titulo = document.getElementById('exampleModalCenterTitle'); 



const listaMascotas = document.getElementById('lista-mascotas'); 

let mascotas=[         //lista
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
            <button type="button" class="btn btn-danger eliminar"><i class="far fa-trash-alt"></i></button>
        </div>
        </td>
    </tr>`).join("");
    listaMascotas.innerHTML=htmlMascotas;//esto limpia el todo el contenido de mascotas
    Array.from(document.getElementsByClassName("editar")).forEach((botonEditar, index)=>botonEditar.onclick = editar(index));
    Array.from(document.getElementsByClassName("eliminar")).forEach((botonEliminar, index)=>botonEliminar.onclick = eliminar(index));

}


function enviarDatos(evento){        //enviar datos
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

function editar(index) {          //editar
    return function cuandohagoclick(){
        
        $('.modal').on('hidden.bs.modal', function(){ // Returns a Bootstrap modal instance
            $(this).find('form')[0].reset();
            btnGuardar.innerHTML='Crear'
            exampleModalCenterTitle.innerHTML='Nueva Mascota'
        });
        btnGuardar.innerHTML='Editar'//Cambiar nom del boton
        exampleModalCenterTitle.innerHTML='Editar'
        $('#exampleModalCenter').modal('toggle')
        
        const mascota=mascotas[index];
        nombre.value=mascota.nombre;
        propietarios.value=mascota.propietarios;
        tipo.value=mascota.tipo;
        indice.value=index;
    }
}



function resetModal(){       //Restaurar
   
    nombre.value='Nombre';
    propietarios.value='Propietarios';
    tipo.value='Tipo animal';
    indice.value='';
    btnGuardar.innerHTML='Crear'
}


function eliminar(index){                               //Eliminar
    return function clickEnEliminar(){
       if(confirm("¿Está seguro que desea eliminar el registro?"))
       {
        
        mascotas = mascotas.filter((mascota, indiceMascota)=>indiceMascota !== index);

       }
    
        listarMascotas();
    }
}

listarMascotas();

form.onsubmit = enviarDatos;
btnGuardar.onclick = enviarDatos;