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
const url = "http://localhost:5000/veterinarias";
const listaVeterinarias = document.getElementById('lista-Veterinarias'); 



let veterinarias=[];       //lista



//Renderizar variable Mascotas en el HTML

async function listaVeterniarias(){//ejecute
    try {
        const respuesta = await fetch(url);
        const veternariasDelServer = await respuesta.json();
        if (Array.isArray(veternariasDelServer)) {
            veterinarias = veternariasDelServer;
        }
        if (veterinarias.length > 0) {
            const htmlVeterinarias = veterinarias
            .map((veterinario, index)=>`<tr>
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
            return;
        }
        listaVeterinarias.innerHTML = `<tr>
            <td colspan="5" class="lista-vacia">No hay veterinarias</td>
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
        if (validar(datos)===true) {
            let method = "POST";
            let urlEnvio = url;
            const accion = btnGuardar.innerHTML;
            if (accion === "Editar") {
                method = "PUT";
                veterinarias[indice.value] = datos;
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
                listaVeterniarias();//ejecutalo
                resetModal();
            }
            return;
        }
        $(".alert-warning").show();
    } catch (error) {
        console.log({ error });
        $(".alert").show(); // . show muestra las elertas desde Javascript
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


function eliminar(index){   
        const urlEnvio = `${url}/${index}`;                        //Eliminar
        return async function clickEnEliminar(){
        try {
            if(confirm("¿Está seguro que desea eliminar el registro?")){
            
            const respuesta = await fetch(urlEnvio, {
                method:'DELETE',
            });
            if (respuesta.ok) {
                listaVeterniarias();
                resetModal();
            }
            }
        } catch (error) {
            console.log({ error });
        $(".alert").show();
        }
    }                          
}

listaVeterniarias();

form.onsubmit = enviarDatos;
btnGuardar.onclick = enviarDatos;