

// Create a html server on port 5000.
var http = require('http');
var fs = require('fs');
var index = fs.readFileSync('index.html');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(index);
}).listen(5000);   


// Create websocket server on Port 8082 
// Based off sample at https://github.com/websockets/ws 
// TODO: Wrap create process in Try/catch.

class StopWatch {
  // Somewhat like the mechnical stopwatch where you repeatedly press a button to start and stop the sweep hand.
  // Eventually you get the total time for some activity, represented by the final position of sweep hand.
  // Reset zeroes out total time. Or metaphorically, repositions sweep hand at zero. 

  constructor () {
    this.startTime = 0;
    this.accumulatedRunTime = 0;
    this.normalizedRunTime=0;
    this.isRunning = false;
  }
  start () {this.run();}

  run () {
    if (!this.isRunning) {  // Ignore run event if already running.  
      this.startTime = Date.now();
      this.isRunning = true;
    }};

  stop () {                
    if (this.isRunning) {   // Ignore stop event if not running.
      this.accumulatedRunTime += Date.now()- this.startTime;
      this.normalizedRunTime = parseInt(this.accumulatedRunTime/1000);
      this.isRunning = false;
    }};

  reset (timeCode) {
    this.accumulatedRunTime = timeCode; // TODO: Add bounds check on timecode (0<=TC<=video length)
    this.isRunning = false;  
  };

  getRunTime () {
    if (!this.isRunning){
      return this.normalizedRunTime;     // Server's presumed actual position in video.
    }
      return parseInt((this.accumulatedRunTime+(Date.now() - this.startTime))/1000);
    }

  getRunTimeSubsecond () {
    if (!this.isRunning){
      return this.accumulatedRunTime/1000;     // Server's presumed actual position in video.
    }
      return (this.accumulatedRunTime+(Date.now() - this.startTime))/1000;
    }
  
  // isRunning() {return this.isRunning};

}

let ClientData = {
  "eventCode":"",
  "clientTimeCode":0,
  "clientTimeStamp":0,
  "clientDate":Date(),
  "sendText":"na",
}
let serverData = {
  "eventCode":"na",
  "serverTimeCode":0,
  "serverTimeStamp":0,
  "echoText":"na",
}

const ServerInitTime = Date.now();
const WebSocket = require("ws");
const wss = new WebSocket.Server({port:'8082'});
console.log("Socket Server Started");       

let startTime = null
let connCounter = 0;   // Track current number of browser sessions.
let sw = new StopWatch();
 
wss.on('connection', (ws)=> {
console.log("New client connected. Total connections=", ++connCounter);   

    ws.on('message', data=> {
      ClientData = JSON.parse(data);                console.log("EventCode" , ClientData.eventCode);

      if (ClientData.eventCode=="NEW" ){             console.log("New Client");
        serverData.echoText = ClientData.sendText;
        serverData.eventCode = "NEW";
        serverData.serverTimeCode = sw.getRunTime();    
        let payload = JSON.stringify(serverData);
        ws.send(payload); 
        if (!sw.isRunning) {   // First time start of video, then start sw.
          sw.run();
        }
        
      }
      else {
        switch (ClientData.eventCode) {
          case "PLAY":
              sw.run();                           console.log("Play Pressed"); 
            break;
          case "PAUSE":
              sw.stop();                          console.log("Pause :", sw.getRunTime());
            break;
          case "SYNCALL":
            serverData.serverTimeCode=ClientData.clientTimeCode;
            break;
        }

        serverData.echoText = ClientData.sendText.toUpperCase();
        serverData.eventCode = ClientData.eventCode;
        let payload= JSON.stringify(serverData);

        wss.clients.forEach(client=> {
          if (client.readyState === WebSocket.OPEN) {
            client.send(payload);
          }
        });
      }
console.log("JSON", ClientData.eventCode, ClientData.clientTimeStamp, ClientData.clientDate);


    });

    ws.on("close",()=>{
        console.log("Client  disconnected. Total connections=", --connCounter);
    });

});

console.log("Number of Connections", connCounter);





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

