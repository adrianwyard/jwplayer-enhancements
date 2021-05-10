

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
    this.accumulatedRunTime = 0;    //   this.normalizedRunTime=0;
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
      this.isRunning = false;
    }};

  reset (timeVal) {
    this.accumulatedRunTime = timeVal; // TODO: Add bounds check on timecode (0<=TC<=video length)
    this.isRunning = false;  
  };

  getTimeCode() {
    this.getRunTime;
  }

  getRunTime () {
    if (!this.isRunning){
      return this.accumulatedRunTime/1000;     // Server's presumed actual position in video.
    }
      return (this.accumulatedRunTime+(Date.now() - this.startTime))/1000;
    }

  XXgetRunTimeSubsecond () {
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
 // "clientDate":Date(),
  "sendText":"na",
}
let serverData = {
  "eventCode":"na",
  "serverTimeCode":0,
 // "serverTimeStamp":0,
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

        if (!sw.isRunning) {   // First time start of video, then start sw.
            sw.run();
        }
        serverData.serverTimeCode = sw.getTimeCode();    

        ws.send(JSON.stringify(serverData)); 
        
      }
      else {
        switch (ClientData.eventCode) {
          case "PLAY":
            sw.run();   // console.log("Play Pressed"); 
            break;
          case "PAUSE":
            sw.stop();   // console.log("Pause :", sw.getRunTime());
            break;
          case "SYNCALL":
            serverData.serverTimeCode=ClientData.clientTimeCode;
            sw.reset(ClientData.clientTimeCode)
            break;
        }

        serverData.echoText = ClientData.sendText.toUpperCase();
        serverData.eventCode = ClientData.eventCode;
        serverData.serverTimeStamp=sw.getTimeCode();

        wss.clients.forEach(client=> {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(serverData));
          }
        });
      }

console.log("JSON", ClientData.eventCode, ClientData.clientTimeStamp);
    });

    ws.on("close",()=>{
        console.log("Client  disconnected. Total connections=", --connCounter);
    });

});

console.log("Number of Connections", connCounter);

