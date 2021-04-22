module.exports = {
    mascotas:[
        {tipo: 'Perro',nombre:'Duque0', propietarios:'Jorge'},
        {tipo: 'Perro',nombre:'Duque1', propietarios:'Jorge'},
        {tipo: 'Perro',nombre:'Duque2', propietarios:'Jorge'},
        {tipo: 'Perro',nombre:'Duque3', propietarios:'Jorge'},
        {tipo: 'Perro',nombre:'Duque4', propietarios:'Jorge'},
    ],
    veterinarias:[
        { nombre: "Carlos", apellido: "Gonzales", documento: "18090638" },
        { nombre: "Paco", apellido: "Cordero", documento: "18090639" },
        { nombre: "Karime", apellido: "Perez", documento: "18090640" },
        { nombre: "Laura", apellido: "Lopez", documento: "18090641" },
    ],
    duenos: [
        { nombre: "Carime", apellido: "Gonzales", documento: "18090638" },
        { nombre: "Jorge", apellido: "Cordero", documento: "18090639" },
        { nombre: "Luz", apellido: "Perez", documento: "18090640" },
        { nombre: "Carmelita", apellido: "Lopez", documento: "18090641" },
    ],
    consultas: [
        {
        mascota: 0,
        veterinaria: 0,
        fechaCreacion: new Date(),//fechas automaticas
        fechaEdicion: new Date(),
        historia: "",
        diagnostico: "",
        },
    ],
};
