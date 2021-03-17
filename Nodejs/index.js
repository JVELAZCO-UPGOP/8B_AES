const http = require('http');//llamamos al paquete de http
const requestHandler = require("./request-handler");

const server = http.createServer(requestHandler);
server.listen(5000,() => {
    console.log(
        "el servidor esta escuchando peticiones http://localhost:5000/"
    );
});
