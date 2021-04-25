module.exports = function veterinariasHandler(veterinarias) {
    return {
        get: (data, callback) => {//creando un handler enlistar veterinarias
            console.log('handler veterinarias',{data});
            if (typeof data.indice !== "undefined") {
                if (veterinarias[data.indice]) {
                    return callback(200, veterinarias[data.indice]);
                }
                return callback(404,
                    {mensaje: `veterinaria con indice ${data.indice} no encontrado`
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

                    let respuestasVeterinarias = [...veterinarias];

                    for(const llave of llavesQuery){

                        respuestasVeterinarias = respuestasVeterinarias.filter((_veterinaria) =>{

                            const expresionRegular = new RegExp(data.query[llave], 'ig');

                            const  resultado = _veterinaria[llave].match(expresionRegular);
                            return resultado;
                        });
                    }
                    return callback(200, respuestasVeterinarias);
                }
            callback(200, veterinarias);
        },
        post: (data, callback) => {//creando un handler crear veterinario
            
            veterinarias.push(data.payload);
            callback(201, data.payload);
        },
        put: (data, callback) => {//creando un handler actualizar veterinarias
            if (typeof data.indice !== "undefined") {
                if (veterinarias[data.indice]) {
                    veterinarias[data.indice] = data.payload;
                    return callback(200, veterinarias[data.indice]);
                }
                return callback(404,{
                    mensaje: `veterinaria con indice ${data.indice} no encontrado`,
                });
            }
            callback(400, {mensaje : "indice no enviado"});
        },
        delete: (data, callback) => {//creando un handler eliminar veterinarias
            if (typeof data.indice !== "undefined") {
                if (veterinarias[data.indice]) {
                    veterinarias = veterinarias.filter(
                        (_veterinaria, indice) => indice != data.indice
                    );
                    return callback(204, {mensaje: `elemento con indice ${data.indice} eliminado`});
                }
                return callback(404,{
                    mensaje: `veterinaria con indice ${data.indice} no encontrado`,
                });
            }
            callback(400, {mensaje : "indice no enviado"});
        },
    };
};