module.exports = function mascotasHandler(mascotas) {
    return {
        get: (data, callback) => {//creando un handler enlistar mascotas
            if (typeof data.indice !== "undefined") {
                console.log('handler mascotas',{data});
                if (mascotas[data.indice]) {
                    return callback(200, mascotas[data.indice]);
                }
                return callback(404,
                    {mensaje: `mascota con indice ${data.indice} no encontrado`
                });
            }
            callback(200, mascotas);
        },
        post: (data, callback) => {//creando un handler crear mascotas
            mascotas.push(data.payload);
            callback(201, data.payload);
        },
        put: (data, callback) => {//creando un handler actualizar mascotas
            if (typeof data.indice !== "undefined") {
                if (mascotas[data.indice]) {
                    mascotas[data.indice] = data.payload;
                    return callback(200, mascotas[data.indice]);
                }
                return callback(404,{
                    mensaje: `mascota con indice ${data.indice} no encontrado`,
                });
            }
            callback(400, {mensaje : "indice no enviado"});
        },
        delete: (data, callback) => {//creando un handler eliminar mascotas
            if (typeof data.indice !== "undefined") {
                if (mascotas[data.indice]) {
                    mascotas = mascotas.filter(
                        (_mascota, indice) => indice != data.indice
                    );
                    return callback(204, {mensaje: `elemento con indice ${data.indice} eliminado`});
                }
                return callback(404,{
                    mensaje: `mascota con indice ${data.indice} no encontrado`,
                });
            }
            callback(400, {mensaje : "indice no enviado"});
        },
    };
};

