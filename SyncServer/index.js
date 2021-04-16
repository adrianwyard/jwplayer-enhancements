var http = require('http');
var fs = require('fs');
var index = fs.readFileSync('index.html');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(index);
}).listen(5000);



const WebSocket = require("ws");
const wss = new WebSocket.Server({port:8082});

let connCounter = 0;

// Here I've modified WS sample from functions to using arrow functions.
// https://github.com/websockets/ws

// Connection handler block
wss.on('connection', (ws, req)=> {
    
    console.log("New client connected! Total connections=", ++connCounter);   

    ws.on('message', data=> {
      wss.clients.forEach(client=> {
        if (client.readyState === WebSocket.OPEN) {
          client.send(data.toUpperCase());
        }
      });
    });

    ws.on("close",()=>{
        console.log("Client  disconnected. Total connections=", --connCounter);
    });

});

console.log("Number Connections", connCounter);

    // const ip = req.headers.pragma;
    // const ip = req.headers['x-forwarded-for'].split(/\s*,\s*/)[0];
    // console.log("New client connected!  ", ip  );  

/* // Most Basic type of connection with no broadcast capability client to other clients.
wss.on("connection", ws=>{
    console.log("New client connected!");
    
    ws.on("message", data=>{
        console.log("Client has sent us: %s",data);
         ws.send(data.toUpperCase().concat(": Server","Mojo", counter++));
    });

    ws.on("close",()=>{
        console.log("Client has disconnected!");
    });
});
*/

