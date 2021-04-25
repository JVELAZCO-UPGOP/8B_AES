module.exports = function duenosHandler(duenos) {
    return {
        get: (data, callback) => {//creando un handler enlistar dueños
            console.log('handler duenos',{data});
            if (typeof data.indice !== "undefined") {
                if (duenos[data.indice]) {
                    return callback(200, duenos[data.indice]);
                }
                return callback(404,
                    {mensaje: `dueno con indice ${data.indice} no encontrado`
                });
            }
            if(data.query && //buscar
                ( typeof data.query.nombre !== 'undefined' || 
                data.query.apellidoM !== 'undefined' || 
                data.query.identificacion !== 'undefined'||
                data.query.apellidoP !== 'undefined'||
                data.query.pais !== 'undefined'
                
                )
                ){
                    const llavesQuery = Object.keys(data.query);

                    let respuestasDuenos = [...duenos];

                    for(const llave of llavesQuery){

                        respuestasDuenos = respuestasDuenos.filter((_dueno) =>{

                            const expresionRegular = new RegExp(data.query[llave], 'ig');

                            const  resultado = _dueno[llave].match(expresionRegular);
                            return resultado;
                        });
                    }
                    return callback(200, respuestasDuenos);
                }
            callback(200, duenos);
        },
        post: (data, callback) => {//creando un handler crear consultas
            
            duenos.push(data.payload);
            callback(201, data.payload);
        },
        put: (data, callback) => {//creando un handler actualizar duenos
            if (typeof data.indice !== "undefined") {
                if (duenos[data.indice]) {
                    duenos[data.indice] = data.payload;
                    return callback(200, duenos[data.indice]);
                }
                return callback(404,{
                    mensaje: `dueno con indice ${data.indice} no encontrado`,
                });
            }
            callback(400, {mensaje : "indice no enviado"});
        },
        delete: (data, callback) => {//creando un handler eliminar dueno
            if (typeof data.indice !== "undefined") {
                if (duenos[data.indice]) {
                    duenos = duenos.filter(
                        (_duenos, indice) => indice != data.indice
                    );
                    return callback(204, {mensaje: `elemento con indice ${data.indice} eliminado`});
                }
                return callback(404,{
                    mensaje: `duenos con indice ${data.indice} no encontrado`,
                });
            }
            callback(400, {mensaje : "indice no enviado"});
        },
    };
};