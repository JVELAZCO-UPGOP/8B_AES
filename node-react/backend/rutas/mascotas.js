module.exports = function mascotasHandler(mascotas) {
    return {
        get: (data, callback) => {//creando un handler enlistar mascotas
            console.log('handler mascotas',{data});
            if (typeof data.indice !== "undefined") {
                if (mascotas[data.indice]) {
                    return callback(200, mascotas[data.indice]);
                }
                return callback(404,
                    {mensaje: `mascota con indice ${data.indice} no encontrado`
                });
            }
            if(data.query && //buscar
                ( typeof data.query.nombre !== 'undefined' || 
                data.query.tipo !== 'undefined' || 
                data.query.propietarios !== 'undefined')
                ){
                    const llavesQuery = Object.keys(data.query);
                    let respuestasMascotas = [...mascotas];
                        respuestasMascotas = respuestasMascotas.filter((_mascota) =>{
                            let resultado = false;
                            for(const llave of llavesQuery){

                                const expresionRegular = new RegExp(data.query[llave], 'ig');
                                resultado = _mascota[llave].match(expresionRegular);
                                if(resultado){
                                    break;
                                }

                            }
                            return resultado;
                        });
                    return callback(200, respuestasMascotas);
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