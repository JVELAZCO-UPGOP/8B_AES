const pais = document.getElementById('pais'); //almacenar las variables
const nombre = document.getElementById('nombre'); 
const identificacion = document.getElementById('identificacion'); 
const apellidoP = document.getElementById('apellidoP'); 
const apellidoM = document.getElementById('apellidoM'); 
const indice = document.getElementById('indice'); 
const form = document.getElementById('form'); 
const btnGuardar = document.getElementById('btn-guardar'); 
const btnEliminar = document.getElementById('btn-eliminar'); 
const titulo = document.getElementById('exampleModalCenterTitle'); 
const listaVeterinarias = document.getElementById('lista-Veterinarias'); 


let veterinarias=[          //lista
    {
        nombre:"Alejandra",
        apellidoP:"Gonzales",
        apellidoM:"Garcia",
        pais:"Venezuela",
        identificacion:"28012731"

    },
    {
        nombre:"Daniel",
        apellidoP:"Lopez",
        apellidoM:"Perez",
        pais:"Colombia",
        identificacion:"28012732"

    }
];


//Renderizar variable Mascotas en el HTML

function listaVeterniarias(){//ejecute
    const htmlVeterinarias = veterinarias.map((veterinario, index)=>`<tr>
        <th scope="row">${index} </th>
        <td>${veterinario.identificacion}</td>
        <td>${veterinario.pais}</td>
        <td>${veterinario.nombre}</td>
        <td>${veterinario.apellidoP}</td>
        <td>${veterinario.apellidoM}</td>
        <td><!--Votones de editar y eliminar datos-->
        <div class="btn-group" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-info editar" ><i class="far fa-edit"></i></button>
            <button type="button" class="btn btn-danger eliminar"><i class="far fa-trash-alt"></i></button>
        </div>
        </td>
    </tr>`).join("");
    listaVeterinarias.innerHTML=htmlVeterinarias;//esto limpia el todo el contenido de mascotas
    Array.from(document.getElementsByClassName("editar")).forEach((botonEditar, index)=>botonEditar.onclick = editar(index));
    Array.from(document.getElementsByClassName("eliminar")).forEach((botonEliminar, index)=>botonEliminar.onclick = eliminar(index));

}

function enviarDatos(evento){          //Enviar datos
    evento.preventDefault();
    const datos = {
        nombre:nombre.value,
        apellidoP:apellidoP.value,
        apellidoM:apellidoM.value,
        pais:pais.value,
        identificacion:identificacion.value
    };
    const accion=btnGuardar.innerHTML;
    switch(accion){
        case 'Editar':
            //editar
            veterinarias[indice.value]=datos
            break;
            default:
                //crear
                veterinarias.push(datos);
            break;
    }

    listaVeterniarias();//ejecutalo
    resetModal();
}

function editar(index) {//editar
    return function cuandohagoclick(){
        
        $('.modal').on('hidden.bs.modal', function(){ // Returns a Bootstrap modal instance
            $(this).find('form')[0].reset();
            btnGuardar.innerHTML='Crear'
            exampleModalCenterTitle.innerHTML='Nuevo Medico Veterinario'
        });
        btnGuardar.innerHTML='Editar'//Cambiar nom del boton
        exampleModalCenterTitle.innerHTML='Editar'
        $('#exampleModalCenter').modal('toggle')
        
        const veterinario=veterinarias[index];
        nombre.value=veterinario.nombre;
        apellidoP.value=veterinario.apellidoP;
        apellidoM.value=veterinario.apellidoM;
        pais.value=veterinario.pais;
        identificacion.value=veterinario.identificacion;
        indice.value=index;
    }
}



function resetModal(){
   
   
    nombre.value="Nombre";
    apellidoP.value="Apellido Paterno";
    apellidoM.value="Apellido Materno";
    pais.value="Pais";
    identificacion.value="Identificacion";
    indice.value='';
    btnGuardar.innerHTML='Crear'
}


function eliminar(index){                               //Eliminar
    return function clickEnEliminar(){
       if(confirm("¿Está seguro que desea eliminar el registro?"))
       {
        
        veterinarias = veterinarias.filter((veterinario, indiceVeterinaria)=>indiceVeterinaria !== index);

       }
    
        listaVeterniarias();
    }
}

listaVeterniarias();

form.onsubmit = enviarDatos;
btnGuardar.onclick = enviarDatos;