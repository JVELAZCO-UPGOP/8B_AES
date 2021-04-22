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
const url = "https://veterinaria-backend1.vercel.app/duenos";
const listaDuenos = document.getElementById('lista-duenos'); 


let duenos = [];          //lista


//Renderizar variable Dueños en el HTML

async function listarDuenos() {//ejecute
    try {
        const respuesta = await fetch(url);
        const duenosDelServer = await respuesta.json();
        if (Array.isArray(duenosDelServer)) {
            duenos = duenosDelServer;
        }
        if (duenos.length > 0) {
            const htmlDuenos = duenos
            .map((dueno, index)=>`<tr>
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
            listaDuenos.innerHTML=htmlDuenos;//esto limpia el todo el contenido de Dueños
            Array.from(document.getElementsByClassName("editar")).forEach((botonEditar, index)=>botonEditar.onclick = editar(index));
            Array.from(document.getElementsByClassName("eliminar")).forEach((botonEliminar, index)=>botonEliminar.onclick = eliminar(index));
            return;
    }
    listaDuenos.innerHTML = `<tr>
        <td colspan="5" class="lista-vacia">No hay Propietarios</td>
        </tr>`;
    } catch (error) {
        console.log({ error });
        $(".alert").show(); // . show muestra las elertas desde Javascript
    }
    
}

async function enviarDatos(evento){          //Enviar datos
    evento.preventDefault();
    try {
        const datos = {
            nombre:nombre.value,
            apellidoP:apellidoP.value,
            apellidoM:apellidoM.value,
            pais:pais.value,
            identificacion:identificacion.value
        };
            if (validar(datos)=== true) {
                let method = "POST";
            let urlEnvio = url;
            const accion=btnGuardar.innerHTML;
            if (accion === "Editar") {
                method = "PUT";
                duenos[indice.value] = datos;
                urlEnvio = `${url}/${indice.value}`;
            }
            const respuesta = await fetch(urlEnvio, {
                method,
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(datos),
                mode: "cors",
            });
            if (respuesta.ok) {
                listarDuenos();//ejecutalo
                resetModal();
            }
            return;
        }
        $(".alert-warning").show();
    } catch (error) {
        console.log({ error });
    $(".alert-danger").show();
    }
}

function validar(datos) {
    if (typeof datos !== "object") return false;
    let respuesta = true;
    for (let llave in datos) {
      if (datos[llave].length === 0) {
        document.getElementById(llave).classList.add("is-invalid");
        respuesta = false;
      } else {
        document.getElementById(llave).classList.remove("is-invalid");
        document.getElementById(llave).classList.add("is-valid");
      }
    }
    if (respuesta === true) $(".alert-warning").hide();
    return respuesta;
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


function resetModal() {
    btnGuardar.innerHTML = "Crear";
    
    [indice, nombre, apellidoP, apellidoM, pais,identificacion ].forEach(
    (inputActual) => {
        inputActual.value = "";
        pais.value="Pais";
        inputActual.classList.remove("is-invalid");
        inputActual.classList.remove("is-valid");
    }
    );
    $(".alert-warning").hide();
    //$("#exampleModalCenter").modal("toggle");
}
// function resetModal(){
//     nombre.value="Nombre";
//     apellidoP.value="Apellido Paterno";
//     apellidoM.value="Apellido Materno";
//     pais.value="Pais";
//     identificacion.value="Identificacion";
//     indice.value='';
//     btnGuardar.innerHTML='Crear'
// }


function eliminar(index){                               //Eliminar
    const urlEnvio = `${url}/${index}`;                        //Eliminar
        return async function clickEnEliminar(){
        try {
            if(confirm("¿Está seguro que desea eliminar el registro?")){
            
            const respuesta = await fetch(urlEnvio, {
                method:'DELETE',
            });
            if (respuesta.ok) {
                listarDuenos();
                resetModal();
            }
            }
        } catch (error) {
            console.log({ error });
        $(".alert").show();
        }
    }     
}

listarDuenos();

form.onsubmit = enviarDatos;
btnGuardar.onclick = enviarDatos;