const url = require('url');
const StringDeCoder = require('string_decoder').StringDecoder;//metodo
const enrutador = require("./enrutador");//guardamos en una variable la ruta del

module.exports = (req, res) =>{//para exportar
    //1.Obtener la url desde el objeto request
    const urlActual = req.url;
    const urlParseada = url.parse(urlActual, true);//el true la convierte en un objeto
    //console.log({urlActual, urlParseada});

    //2.Obtener la ruta
    const ruta =urlParseada.pathname;
    
    //3.Quitar el / a la ruta
    const rutaLimpia =  ruta.replace(/^\/+|\/+$/g, '');

    //3.1.Obtener el metodo http
    const metodo= req.method.toLowerCase();//estemetodo las cambia a minusculas

    //3.2.Obtener variables del query url
    const { query = {} } = urlParseada;//se le agregan las llaves si no tiene query

    //3.3.Obtener los headers 
    const { headers = {} } = req;//se le agregan las llaves si no tiene headers
    //console.log({headers});
    
    //3.4.Obtener paylod en el caso de haber uno
    const decoder = new StringDeCoder('utf-8');
    let buffer = '';

    //3.4.1.Ir acumulando la data cuando el request reciba un payload
    req.on('data', (data) => {
        buffer += decoder.write(data);
    });  
     //3.4.2.Terminar de acumular datos y decirle al decoder que finalice
    req.on('end', () => {
        buffer += decoder.end();

    if (headers["content-type"]==="application/json") {
        buffer =  JSON.parse(buffer);
    }

    //3.4.3 Revisar si tiene subrutas en este caso es el indice de la array
    if (rutaLimpia.indexOf("/")> -1) {
        //separa las rutas
       var [rutaPrincipal,indice] = rutaLimpia.split("/");

    }

        
        //3.5.Ordenar la data del request
        const data = {
            indice,
            ruta:rutaPrincipal || rutaLimpia,
            query,
            metodo,
            headers,
            payload: buffer
        };


    console.log({data});//visualizar en la terminal

        //3.6.Elegir el manejador dependiendo de  la ruta //handler y asignarle la funcion que el enrutador tiene
        let handler;
        if (
            data.ruta && 
            enrutador[data.ruta] && 
            enrutador[data.ruta][metodo]
        ) {
            handler = enrutador[data.ruta][metodo];
        }else{
            handler = enrutador.noEncontrado;
        }

        //4.Ejecuta handler (manejador) para enviar la respuesta
        if (typeof handler === 'function') {
            handler(data, (statusCode = 200, mensaje) => {
                const respuesta = JSON.stringify(mensaje);
                res.setHeader("Content-Type", "application/json");
                res.writeHead(statusCode);
                //linea donde estamos respondiendo a la app cliente
                res.end(respuesta);
            })
        }
    });
};