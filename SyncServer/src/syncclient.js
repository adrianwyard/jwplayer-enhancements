// Sync Client 0.1.010
// Public class and methods.



// Private Class used by Sync Client.
class __StopWatch {
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
    }};

  stop () { 
    // Calculate the amount of time since we last started and add to our total runtime.            
    if (this.isRunning) {   // Ignore stop event if not running.
      this.totalRunTime += performance.now()- this.startTime;
      this.isRunning = false;
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

// Private class, communicates with Sync Server and in turn other clients.
// Sync Client 1.010. Base version tightly coupled to basic JW Player functions.
//
// NOTE: Candance, I suspect that some of this class will need changes to work as callbacks in the HLS code
// you've written. If so please leave this class as is and fork it into an JW Player HLS specific copy.
// Rather copy the class and give it a new Rev# e.g 0_1_020.. or ..RevHLS1_010/.
//
class __WebSocketRev1_010 {

  constructor (connIP_Port, JWElementID, userID){

  // Primary JSON data structures used to communicate over web socket.
  this.ClientData = {
    "eventCode": "CD.eC",   // Action request from client sent to SyncServer.
    "clientTimeCode":  -1,  // Value from JW Player api.     // rename --> JWPlayerTimeCode
    "clientTimeStamp": -1,  // Value from page stopwatch.    // rename --> LocalTimer
    "sendText":"CD.sT",     // Use to sanity check socket connection.
    };

  this.ServerData = {
    "eventCode": "SD.eC",   // Typically same value as sent by client.
    "serverTimeCode": -1,   // Either an echoed clientTimeCode or server's stopwatch timecode.
    "echoText": "SD.eT",    // Result shown on screen in sanity checking.
    "serverTimerIsRunning": false,  // Return current run state of stopwatch timer.
    }
    this.userID = userID;
    this.connIP_Port = connIP_Port;
    this.createWSConnection(this.connIP_Port);
    this.addMessageHandlers();
  }

  createWSConnection (connIP_Port){
    // CHANGE BLOCK: Uncomment desired websocket connection. 
    // Adrian Server:  
    // const ws = new WebSocket("ws://ec2-18-237-232-102.us-west-2.compute.amazonaws.com:8082");
    // Andreas AWS:
    // const ws = new WebSocket("ws://3.80.109.107:8082");    // Current IP must be updated too.
    // Testing on local host:
    this.ws = new WebSocket("ws://localhost:8082");
    // CHANGE BLOCK END.
    this.sw = new __StopWatch();

    // Initiate web socket connection to SyncServer.
    this.ws.addEventListener("open", ()=>{
      this.ClientData.eventCode="NEW";
      this.ClientData.sendText="Hello All!";
      this.ws.send(JSON.stringify(this.ClientData));
    });
  }

  addMessageHandlers(){

    // Handle messages from SyncServer. 
    this.ws.addEventListener("message",({data}) =>{      
      this.ServerData = JSON.parse(data);

      switch (this.ServerData.eventCode) {
        case 'SENDTEXT':
          document.getElementById("echoText").value = this.ServerData.echoText; 
          break;

        case 'ECHOTEXT':
          document.getElementById("echoText").value = this.ServerData.echoText; 
          break;

        case 'PLAY':
          if (jwplayer("myElement").getState()=="paused") {
            jwplayer("myElement").play();
          }

          this.sw.start();

          document.getElementById("playState").value = this.ServerData.eventCode;
          this.setTimerDisplays();
          break; 

        case 'NEW':
          jwplayer("myElement").seek(this.ServerData.serverTimeCode);
          this.sw.reset(this.ServerData.serverTimeCode);
    
          if (this.ServerData.serverTimerIsRunning == true) {
            if (jwplayer("myElement").getState()!="play") {  
            //TODO: Kludge if player not ready.. Handling all preplay states? Async video load?
            // setTimeout(jwplayer("myElement").play(),60000);
            jwplayer("myElement").play()
            this.sw.start();     
          }  }

          document.getElementById("echoText").value = this.ServerData.echoText;
          this.setTimerDisplays();           
          break; 

        case 'JOIN':
          jwplayer("myElement").seek(this.ServerData.serverTimeCode);
          this.sw.reset(this.ServerData.serverTimeCode);

          if (this.ServerData.serverTimerIsRunning == true) {
            if (jwplayer("myElement").getState()=="paused") {  

              jwplayer("myElement").play();
          //   this.swstart();         
          }}

          document.getElementById("playState").value = this.ServerData.eventCode;
          this.setTimerDisplays();           
          break; 

        case 'PAUSE':
          if (jwplayer("myElement").getState()=="playing") {
            jwplayer("myElement").pause();
          }
          this.sw.stop();

          document.getElementById("playState").value = this.ServerData.eventCode;
          this.setTimerDisplays();
          break;

        case 'SYNCALL':
          jwplayer("myElement").seek(this.ServerData.serverTimeCode);
    
          if (jwplayer("myElement").getState()=="playing") {
            jwplayer("myElement").pause();
          }

          this.sw.reset(this.ServerData.serverTimeCode);

          document.getElementById("playState").value = this.ServerData.eventCode;
          this.setTimerDisplays();
          break;

        case 'SYNCPLAY':
          jwplayer("myElement").seek(this.ServerData.serverTimeCode);
          if (jwplayer("myElement").getState()=="paused") {
            jwplayer("myElement").play();
          }

          this.sw.reset(this.ServerData.serverTimeCode);

          document.getElementById("playState").value = this.ServerData.eventCode;
          this.setTimerDisplays();
          break;

        case 'ZEROALL':
          if (jwplayer("myElement").getState()=="playing") {
            jwplayer("myElement").pause();
          }

          jwplayer("myElement").seek(this.ServerData.serverTimeCode);
          this.sw.reset(this.ServerData.serverTimeCode);

          document.getElementById("playState").value = this.ServerData.eventCode;
          this.setTimerDisplays();
          break;

        default:
          document.getElementById("playState").value = this.ServerData.eventCode;
          this.setTimerDisplays();    }
      });
  }

  setTimerDisplays () {
    document.getElementById("timeCode").value = jwplayer("myElement").getPosition();
    // document.getElementById("timeStamp").value = this.swgetTimeCode();
    document.getElementById("serverStamp").value = this.ServerData.serverTimeCode;
  }
  
  sendMyText() {
    this.ClientData.eventCode = "SENDTEXT";
    this.ClientData.sendText = document.getElementById("myText").value;
  
    this.ws.send(JSON.stringify(this.ClientData));
  }
  
  sendEchoText() {
    this.ClientData.eventCode = "ECHOTEXT";
    this.ClientData.sendText = document.getElementById("echoText").value;
  
    this.ws.send(JSON.stringify(this.ClientData));
  }
  
  videoPlay() {
    this.ClientData.eventCode = "PLAY";
   // this.ClientData.clientTimeCode = jwplayer("myElement").getPosition;
   // this.ClientData.clientTimeStamp = this.swgetTimeCode();
   this.ClientData.sendText="N/A";
  
   this.ws.send(JSON.stringify(this.ClientData));
  }
  
  videoPause() {
    this.ClientData.eventCode = "PAUSE";
   // this.ClientData.clientTimeCode = jwplayer("myElement").getPosition;
   // this.ClientData.clientTimeStamp = this.swgetTimeCode();
   this.ClientData.sendText="N/A";
  
   this.ws.send(JSON.stringify(this.ClientData));
  }
  
  joinRoom() {
    this.ClientData.eventCode = "JOIN";
   // this.ClientData.clientTimeCode= -1;
  // this.ClientData.clientTimeStamp = -1;
  this.ClientData.sendText = "N/A";
  
  this.ws.send(JSON.stringify(this.ClientData));
  }
  
  syncAll() {
    // Reset timers and video on all clients to this client's timecode e.g. after scrubbing.
    // Action steps occur in server and client handlers for this eventCode.  
    this.ClientData.eventCode = "SYNCALL";
    this.ClientData.clientTimeCode = jwplayer("myElement").getPosition(); //  Math.trunc(jwplayer("myElement").getPosition()*100);
  //  this.ClientData.clientTimeStamp = this.swgetTimeCode();
  this.ClientData.sendText="N/A";
  
  this.setTimerDisplays();
    this.ws.send(JSON.stringify(this.ClientData));
  }
  
  syncPlay() {
    // Reset timers and video on all clients to this client's timecode.
    // Automatically resume video playing for all.
    // Action steps occur in server and client handlers for this eventCode.  
    this.ClientData.eventCode = "SYNCPLAY";
    this.ClientData.clientTimeCode = jwplayer("myElement").getPosition(); //  Math.trunc(jwplayer("myElement").getPosition()*100);
  //  this.ClientData.clientTimeStamp = this.swgetTimeCode();
  this.ClientData.sendText="N/A";
  
    this.setTimerDisplays();
    this.ws.send(JSON.stringify(this.ClientData));
  }
  
  zeroAll () {
    // Reset timers and video to 0 seconds for all clients. Pause all video playing.
    // Action steps occur in server and client handlers for this eventCode.  
    this.ClientData.eventCode = "ZEROALL";
    this.ClientData.clientTimeCode= 0;
   // this.ClientData.clientTimeStamp = this.sw.getTimeCode();
   this.ClientData.sendText = "N/A";
  
    this.ws.send(JSON.stringify(this.ClientData));
  }

}

// SyncClient provides several primatives that control the JW Player and communicate
// with the Node SyncServer 

// NOTE: Candance, I suspect this class will need changes to work as callbacks in your HLS code.
// you've written. If so please leave this class as is and fork it into an JW Player HLS specific copy.
// Rather copy the class and give it a new Rev# e.g 1_020.. or ..RevHLS1_010/.
class SyncClient  {
  constructor (socketPort, Player_DivID, UserID) {
    this.__socketPort = socketPort;   // Valid strings examples. "ws://ec2-18-237-232-102.us-west-2.compute.amazonaws.com:8082".
                                      // "ws://3.80.109.107:8082" // AK Temporary IP.
                                      // "ws://localhost:8082"    // A local deve/test environment.

    this.__JWElement = Player_DivID;  // JW Player such as "myElement"... may not need if defined in main javascript.
    this.__UserID = UserID;           // "Guest" or if available a name.
    this.__ws = new __WebSocketRev1_010 (this.__socketPort);   // 
    this.debug = false;
  };
  demoA () {
    this.debug && alert("Demo Sync Client Class");
  }
  
  // Start everyone's player at current timecode on Sync Server.  
  // Attach to the JW Player play button pressed event handler.
  play () {
    this.debug && alert("Video Play");
     this.__ws.videoPlay();
  };

  // Pause everyone's player as result of any user pressing their pause button.
  // Attach to the JW Player pause button pressed event handler.
  pause () {
    this.debug && alert("Pause Video");
    this.__ws.videoPause();
  };

  // Set server time code based on client's current time code position.
  // Attach to scrub event handler. 
  setTime (timeCode) {
    this.debug &&  alert ("Set Time Code", timeCode);

  }

  // Method to handle messages from SyncServer like Play, Pause, Set timecode.
  syncServerListener ()
  {
    this.debug &&  alert ("Set Time Code", timeCode);
  }


  //-----------------------------------
  // Wrapper functions for backward compatability with SyncPlay testing SyncClient.html
  // and other possible performance analysis. Functionality may change.
  // Should not be used when integrating SyncPlay with HLS.
  sendMyText() {
    this.__ws.sendMyText();
  }
  
  sendEchoText() {
    this.__ws.sendEchoText();
  }
  
  videoPlay() {
    this.__ws.videoPlay();
  }
  
  videoPause() {
    this.__ws.videoPause();
  }
  
  joinRoom() {
    this.__ws.joinRoom();
  }
  
  syncAll() {
    this.__ws.syncAll();
  }
  
  syncPlay() {
    this.__ws.syncPlay();
  }
  
  zeroAll () {
    this.__ws.zeroAll();
  }
  //--------------------------------



}