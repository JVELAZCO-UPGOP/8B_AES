module.exports = {
    mascotas:[
        {tipo: 'Perro',nombre:'Roko', propietarios:'Jorge'},
        {tipo: 'Perro',nombre:'Toby', propietarios:'Mario'},
        {tipo: 'Gato',nombre:'Manchas', propietarios:'Brayan'},
        {tipo: 'Perro',nombre:'Lucy', propietarios:'Jhon'},
        {tipo: 'Gato',nombre:'Lucas', propietarios:'Valery'},
    ],
    veterinarias:[
        { nombre: "Carlos", apellidoM: "Gonzales", identificacion: "1800638", apellidoP:"Moreno", pais:"Venezuela" },
        { nombre: "Paco", apellidoM: "Cordero", identificacion: "18090639", apellidoP :"Marquez",pais:"Mexico"},
        { nombre: "Karime", apellidoM: "Perez", identificacion: "18090640" , apellidoP:"Fierros", pais:"Colombia"},
        { nombre: "Laura", apellidoM: "Lopez", identificacion: "18090641", apellidoP:"Gonzales", pais:"Canada" },
    ],
    duenos: [
        { nombre: "Susana", apellidoM: "Marquex", identificacion: "11111111", apellidoP:"Fargas", pais:"Venezuela"  },
        { nombre: "Lety", apellidoM: "Cabrera", identificacion: "22222222", apellidoP:"Vegas", pais:"Venezuela" },
        { nombre: "Luz", apellidoM: "Florez", identificacion: "33333333", apellidoP:"Luna", pais:"Mexico" }, 
        { nombre: "Evelyn", apellidoM: "Cruz", identificacion: "44444444", apellidoP:"Perez", pais:"Colombia" },
    ],
    consultas: [
        {
        mascota: 0,
        veterinaria: 0,
        fechaCreacion: new Date(),//fechas automaticas
        fechaEdicion: new Date(),
        historia: "Molestia en la pata Izquierda superior",
        diagnostico: "Fractura en pata Izquierda",
        },
    ],
};

