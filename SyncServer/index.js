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
const {performance} = require("perf_hooks");

// Primary JSON data structures used to communicate over web socket.
let ClientData = {
  "eventCode": "CD.eC",   // Action request from client sent to SyncServer.
  "clientTimeCode":  -1,   // Value from JW api.
  "clientTimeStamp": -1,   // Value from page stopwatch.
  "sendText":"CD.sT",     // Use to sanity check socket connection.
  }

let ServerData = {
  "eventCode": "SD.eC",    // Typically same value as sent by client.
  "serverTimeCode": -1,    // Either an echoed clientTimeCode or server's stopwatch timecode.
  "echoText": "SD.eT",     // Result shown on screen in sanity checking.
  "serverTimerIsRunning": false,  // Return current run state of stopwatch timer.
}

class StopWatch {
  // A real stopwatch can be repeatedly started and stopped, and as a result it shows a total running time.
  // Similarly this stopwatch class can accumulate a total of the running time intervals.
  // It also has a reset method sets accumulated total to a specific total time.

  constructor () {
    this.startTime = undefined;
    this.totalRunTime = 0;    
    this.isRunning = false;
  }
  
  start () {
    // Set the basis of next running time interval using system time. 
    if (!this.isRunning) {  // Ignore run event if already running.  
      this.startTime = performance.now();
      this.isRunning = true;
      console.log("Change Stop -> Start: ", this.getRunTime());
    }};

  stop () { 
    // Calculate the amount of time since we last started and add to our total runtime.            
    if (this.isRunning) {   // Ignore stop event if not running.
      this.totalRunTime += performance.now()- this.startTime;
      this.isRunning = false;
      console.log("Change Start -> Stop: ", this.getRunTime());

    }};

  reset (timeVal) {
    // Initialize stopwatch timer to 0 or an arbitrary point in video.
    // TODO: Add bounds check on timeval (0<=TC<=video length)
    this.startTime=undefined;
    this.totalRunTime = timeVal; 
    this.isRunning = false;  
  };

  getRunTime () {
    let accTime;
    if (this.isRunning) {  
      // Get snapshot of run time, by adding  
      accTime = this.totalRunTime+(performance.now() - this.startTime);
      console.log("Get Time while isRunning");

    } 
    else {
      accTime = this.totalRunTime;
      console.log("Get Time when not Running");
    }
    return accTime;
  };

  getTimeCode() {
    return this.getRunTime()/1000;
  };

  getIsRunning() {
    return this.isRunning;
  };

}



const WebSocket = require("ws");
const wss = new WebSocket.Server({port:'8082'});
console.log("Socket Server Started");       

let connCounter = 0;   // Current number of browser sessions.
let sw = new StopWatch();
 
wss.on('connection', (ws)=> {
  console.log("New client connected. Total connections=", ++connCounter);   

  ws.on('message', data=> {
    ClientData = JSON.parse(data);       

    console.log("Message", JSON.stringify(ClientData, null,2));

    // For 'NEW' event, return message, only to sender.
    if (ClientData.eventCode=="NEW" || ClientData.eventCode=="JOIN"){ 
 
      if (!sw.isRunning & connCounter==1) {   // First time start of video, then start sw.
          sw.start();
          console.log("Server Timer start");
      }

      ServerData.eventCode = ClientData.eventCode;
      ServerData.serverTimeCode = sw.getTimeCode();    
      ServerData.echoText = ((ClientData.eventCode=="NEW") ? "Welcome New" : "Joined Room");
      ServerData.serverTimerIsRunning = sw.getIsRunning();
    
      ws.send(JSON.stringify(ServerData)); 

    console.log("Message", JSON.stringify(ServerData, null,2));
    }
    // For all other events, return a message to everyone.
    else {
      // Set event specific paramenters.
      switch (ClientData.eventCode) {
        case "PLAY":
          sw.start();
          break;
        case "PAUSE":
          sw.stop();
          break;
        case "SYNCALL":
          sw.reset(ClientData.clientTimeCode*1000);
          sw.start();
          break;
        case "ZEROALL":
          sw.reset(ClientData.clientTimeCode);
          break;
      }

      // Build return message. 
      ServerData.eventCode = ClientData.eventCode;
      ServerData.serverTimeCode =  sw.getTimeCode();        
      ServerData.echoText = ClientData.sendText.toUpperCase();
      ServerData.serverTimerIsRunning = sw.getIsRunning();

      // Loop thru list of clients.
      wss.clients.forEach(client=> {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(ServerData));
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

