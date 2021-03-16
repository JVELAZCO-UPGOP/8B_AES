
const tipo = document.getElementById('tipo'); //almacenar las variables
const nombre = document.getElementById('nombre'); 
const propietarios = document.getElementById('propietarios'); 
const indice = document.getElementById('indice'); 
const form = document.getElementById('form'); 
const btnGuardar = document.getElementById('btn-guardar'); 
const btnEliminar = document.getElementById('btn-eliminar'); 
const titulo = document.getElementById('exampleModalCenterTitle'); 
const listaMascotas = document.getElementById('lista-mascotas'); 
const url = "http://localhost:5000/mascotas";


let mascotas=[];

//Renderizar variable Mascotas en el HTML

async function listarMascotas(){//ejecute
    try {
        const respuesta = await fetch(url);
        const mascotasDelServer = await respuesta.json();
        if (Array.isArray(mascotasDelServer)) {
            mascotas = mascotasDelServer;
          }
          if (mascotas.length > 0) {
            const htmlMascotas = mascotas
              .map(
                (mascota, index) => `<tr>
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
          </tr>`
              )
              .join("");
            listaMascotas.innerHTML = htmlMascotas;
            Array.from(document.getElementsByClassName("editar")).forEach(
              (botonEditar, index) => (botonEditar.onclick = editar(index))
            );
            Array.from(document.getElementsByClassName("eliminar")).forEach(
              (botonEliminar, index) => (botonEliminar.onclick = eliminar(index))
            );
            return;
          }
          listaMascotas.innerHTML = `<tr>
              <td colspan="5" class="lista-vacia">No hay mascotas</td>
            </tr>`;
        
    } catch (error) {
      console.log({ error });
        $(".alert-danger").show(); // . show muestra las elertas desde Javascript
    }
}


async function enviarDatos(evento) {
    evento.preventDefault();
    try {
      const datos = {
        tipo: tipo.value,
        nombre: nombre.value,
        propietarios: propietarios.value,
      };
    if (validar(datos)=== true) {
      let method = "POST";
      let urlEnvio = url;
      const accion = btnGuardar.innerHTML;
      if (accion === "Editar") {
        method = "PUT";
        mascotas[indice.value] = datos;
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
        listarMascotas();
        resetModal();
      }
      return  ;
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

function resetModal() {
  btnGuardar.innerHTML = "Crear";
  
  [indice, nombre, propietarios, tipo ].forEach(
  (inputActual) => {
      inputActual.value = "";
      tipo.value="Tipo animal";
      propietarios.value="Propietarios";
      inputActual.classList.remove("is-invalid");
      inputActual.classList.remove("is-valid");
  }
  );
  $(".alert-warning").hide();
  //$("#exampleModalCenter").modal("toggle");
}

// function resetModal(){       //Restaurar
   
//     nombre.value='Nombre';
//     propietarios.value='Propietarios';
//     tipo.value='Tipo animal';
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
            listarMascotas();
            resetModal();
          }
        }
      } catch (error) {
        console.log({ error });
      $(".alert").show();
    }
  }
};


listarMascotas();



form.onsubmit = enviarDatos;
btnGuardar.onclick = enviarDatos;