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

const listaDuenos = document.getElementById('lista-duenos'); 



let duenos = [          //lista
    {
        nombre:"Yosse",
        apellidoP:"Luna",
        apellidoM:"Garcia",
        pais:"Colombia",
        identificacion:"280127344"

    },
    {
        nombre:"Jorge",
        apellidoP:"Perez",
        apellidoM:"Cruz",
        pais:"Colombia",
        identificacion:"2801273255"

    }
];


//Renderizar variable Mascotas en el HTML

function listarDuenos() {//ejecute
    const htmlDuenos = duenos.map((dueno, index)=>`<tr>
        <th scope="row">${index} </th>
        <td>${dueno.identificacion}</td>
        <td>${dueno.pais}</td>
        <td>${dueno.nombre}</td>
        <td>${dueno.apellidoP}</td>
        <td>${dueno.apellidoM}</td>
        <td><!--Votones de editar y eliminar datos-->
        <div class="btn-group" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-info editar" ><i class="far fa-edit"></i></button>
            <button type="button" class="btn btn-danger eliminar"><i class="far fa-trash-alt"></i></button>
        </div>
        </td>
    </tr>`).join("");
    listaDuenos.innerHTML=htmlDuenos;//esto limpia el todo el contenido de mascotas
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
            duenos[indice.value]=datos
            break;
            default:
                //crear
            duenos.push(datos);
            break;
    }

    listarDuenos();//ejecutalo
    resetModal();
}

function editar(index) {//editar
    return function cuandohagoclick(){
        
        $('.modal').on('hidden.bs.modal', function(){ // Returns a Bootstrap modal instance
            $(this).find('form')[0].reset();
            btnGuardar.innerHTML='Crear'
            exampleModalCenterTitle.innerHTML='Nuevo Propietario'
        });
        btnGuardar.innerHTML='Editar'//Cambiar nom del boton
        exampleModalCenterTitle.innerHTML='Editar'
        $('#exampleModalCenter').modal('toggle')
        
        const dueno=duenos[index];
        indice.value = index;
        nombre.value = dueno.nombre;
        apellidoP.value = dueno.apellidoP;
        apellidoM.value = dueno.apellidoM;
        pais.value = dueno.pais;
        identificacion.value = dueno.identificacion;
        
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
        
        duenos = duenos.filter((dueno, indiceDueno)=>indiceDueno !== index);

       }
    
        listarDuenos();
    }
}

listarDuenos();

form.onsubmit = enviarDatos;
btnGuardar.onclick = enviarDatos;