import { createServer } from "node:http";

const port = process.env.PORT;

const servidor = createServer((peticion, respuesta) => {

    console.log(`Pedido recibido: ${peticion.method} ${peticion.url}`);


    if (peticion.url === "/hora"){
        const hora = new Date().toLocaleTimeString();
        respuesta.writeHead(200, { "content-type": "application/json" });
        respuesta.end(JSON.stringify({ "hora": hora }));
    }
    else if(peticion.url === "/lento"){
        for(let i = 0; i < 5000000000; i++){}
        respuesta.writeHead(200, { "content-type": "application/json" });
        respuesta.end(JSON.stringify({ "mensaje": "Operacion lenta" }));

    }
    else{
        respuesta.writeHead(404, { "content-type": "application/json" });
        respuesta.end(JSON.stringify({ "error": "No encontrado" }))
    }
  
});

if(port){
    servidor.listen(port, () => {
        console.log(`Servidor escuchando en http://localhost:${port}`);
    });
}
else{
    console.log("Error");
}
