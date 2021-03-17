const listaConsultas =document.getElementById("lista-consultas");
const mascota = document.getElementById("mascota");
const veterinaria = document.getElementById("veterinaria");
const historia = document.getElementById("historia");
const diagnostico = document.getElementById("diagnostico");
const indice = document.getElementById('indice');
const btnGuardar = document.getElementById('btn-guardar');
const form = document.getElementById("form");

let consultas = [];
let mascotas = [];
let veterinarias = [];


const url = "http://localhost:5000/";

async function listarConsultas(){
  const entidad="consultas";
    try {
            const respuesta = await fetch(`${url}/${entidad}`);
            const consultasDelServidor = await respuesta.json();
            if (Array.isArray(consultasDelServidor)) {
                consultas = consultasDelServidor;
            }
            if (respuesta.ok) {
                const htmlConsultas = consultas.map(
                    (consulta, indice) =>
                    `<tr>
                    <th scope="row">${indice}</th>
                    <td>${consulta.mascota.nombre}</td>
                    <td>${consulta.veterinaria.nombre} ${consulta.veterinaria.apellidoP} ${consulta.veterinaria.apellidoM}</td>
                    <td>${consulta.veterinaria.identificacion}</td>
                    <td>${consulta.historia}</td>
                    <td>${consulta.diagnostico}</td>
                    <td>${consulta.fechaCreacion}</td>
                    <td>${consulta.fechaEdicion}</td>
                    
                    <td>
                        <div class="btn-group" role="group" aria-label="Basic example">
                        <button type="button"  class="btn btn-info editar"><i class="fas fa-edit"></i></button>
                        </div>
                    </td>
                    </tr>`
                )
                .join("");
                listaConsultas.innerHTML = htmlConsultas;
                Array.from(document.getElementsByClassName("editar")).forEach((botonEditar, index)=>botonEditar.onclick = editar(index));
            }
        } catch (error) {
          console.log({ error });
          $(".alert-danger").show();
    }
}

listarConsultas();//ejecutar

async function listarMascotas(){
  const entidad="mascotas";
  try {
          const respuesta = await fetch(`${url}/${entidad}`);
          const mascotasDelServidor = await respuesta.json();
          if (Array.isArray(mascotasDelServidor)) {
              mascotas = mascotasDelServidor;
          }
          if (respuesta.ok) {
            mascotas.forEach((_mascota, indice) =>{  //SEGUNDA OPCION
              const opcionActual = document.createElement("option");
              opcionActual.innerHTML = _mascota.nombre;
              opcionActual.value = indice;
              mascota.appendChild(opcionActual);
         //////////////////////////////////////////////////////     
              //const htmlMascotas = mascotas
              // .map((mascota, indice) =>   PRIMERA OPCION
              //   `<option value ="${indice}">${mascota.nombre}</option>`
              // )
              // .join("");
              // mascota.innerHTML = htmlMascotas;
          });
        }
      } catch (error) {
        console.log({ error });
        $(".alert-danger").show();
  }
}

listarMascotas();

async function listarVeterinarias(){
  const entidad="veterinarias";
  try {
          const respuesta = await fetch(`${url}/${entidad}`);
          const veterinariasDelServidor = await respuesta.json();
          if (Array.isArray(veterinariasDelServidor)) {
              veterinarias = veterinariasDelServidor;
          }
          if (respuesta.ok) {
            veterinarias.forEach((_veterinaria, indice) =>{  //SEGUNDA OPCION
              const opcionActual = document.createElement("option");
              opcionActual.innerHTML = `${_veterinaria.nombre} ${_veterinaria.apellidoP}`;
              opcionActual.value = indice;
              veterinaria.appendChild(opcionActual);
         //////////////////////////////////////////////////////     
              //const htmlMascotas = mascotas
              // .map((mascota, indice) =>   PRIMERA OPCION
              //   `<option value ="${indice}">${mascota.nombre}</option>`
              // )
              // .join("");
              // mascota.innerHTML = htmlMascotas;
          });
        }
      } catch (error) {
        console.log({ error });
        $(".alert-danger").show();
  }
}

listarVeterinarias();


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
      
      const consulta=consultas[index];
      indice.value = index;
      mascota.value = consulta.mascota.id;
      veterinaria.value = consulta.veterinaria.id;
      historia.value = consulta.historia;
      diagnostico.value = consulta.diagnostico;
      
  }
}


async function enviarDatos(evento) {
  const entidad = "consultas";
  evento.preventDefault();
  try {
    const datos = {
      mascota: mascota.value,
      veterinaria: veterinaria.value,
      historia: historia.value,
      diagnostico: diagnostico.value,
    };
    if (validar(datos) === true) {
      const accion = btnGuardar.innerHTML;
      let urlEnvio = `${url}/${entidad}`;
      let method = "POST";
      if (accion === "Editar") {
        urlEnvio += `/${indice.value}`;
        method = "PUT";
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
        listarConsultas();
        resetModal();
      }
      form.classList.add("was-validated");
      return;
    }
    $(".alert-warning").show();
  } catch (error) {
    console.log({ error });
    $(".alert-danger").show();
  }
}


btnGuardar.onclick = enviarDatos;

function resetModal() {
  btnGuardar.innerHTML = "Crear";
  [indice, mascota, veterinaria, historia, diagnostico].forEach(
    (inputActual) => {
      inputActual.value = "";
      inputActual.classList.remove("is-invalid");
      inputActual.classList.remove("is-valid");
    }
  );
  $(".alert-warning").hide();
  $("#exampleModalCenter").modal("toggle");
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



