// Sync Client 0.010


class SyncClient  {
  constructor (socketPort, JWElement, UserID) {
    this._socketPort = socketPort;   // For moment pass in "ws://ec2-18-237-232-102.us-west-2.compute.amazonaws.com:8082"
    this._JWElement = JWElement;     // Value used to identify JW Player such as "myElement"
    this._UserID = UserID;           // "Guest" or if available a name.
    _sw = new StopWatch ();    
  };

  
  // Start everyone's player at current timecode on Sync Server.  
  // Attach to the JW Player play button pressed event handler.
  play () {
     alert("Video Play");
  };

  // Pause everyone's player as result of any user pressing their pause button.
  // Attach to the JW Player pause button pressed event handler.
  pause () {
    alert("Pause Video");
  };

  // Set server time code based on client's current time code position.
  // Attach to scrub event handler. 
  setTime (timeCode) {
    alert ("Set Time Code", timeCode);
  }

  // Method to handle messages from SyncServer like Play, Pause, Set timecode.
  syncServerListener ()
  {
    alert ("Set Time Code", timeCode);
  }

}

// Private Class used by Sync Client
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