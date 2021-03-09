const http = require('http');//llamamos al paquete de http
const url = require('url');
const StringDeCoder = require('string_decoder').StringDeCoder;

const callbackDelServidor = (req, res) =>{
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
        
        //3.5.Ordenar la data del request
        const data = {
            ruta:rutaLimpia,
            query,
            metodo,
            headers,
            payload: buffer
        };

        //3.6.Elegir el manejador dependiendo de  la ruta //handler y asignarle la funcion que el enrutador tiene
        let handler;
        if (rutaLimpia && enrutador[rutaLimpia]) {
            handler = enrutador[rutaLimpia];
        }else{
            handler = enrutador.noEncontrado;
        }

        //4.Ejecuta handler (manejador) para enviar la respuesta
        if (typeof handler === 'function') {
            handler(data, (statusCode = 200, mensaje) => {
                const respuesta = JSON.stringify(mensaje);
                res.writeHead(statusCode);
                //linea donde estamos respondiendo a la app cliente
                res.end(respuesta);
            })
        }
    });
};

const enrutador = {
    ruta:(data, callback) => {//creando un handler
        callback(200,{mensaje: 'esta es /ruta'});
    },
    usuarios:(data, callback) => {//creando un handler
        callback(200,[{nombre: 'usuario 1'},{nombre: 'usuario 2'}]);
    },
    noEncontrado: (data, callback) => {
        callback(404, {mensaje: 'no encontrado'});
    }
}

const server = http.createServer(callbackDelServidor);

server.listen(5000,() => {
    console.log('el servidor esta escuchando peticiones http://localhost:5000/');
});