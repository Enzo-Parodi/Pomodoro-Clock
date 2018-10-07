//new file!!!!

let defaultBreakLength = 5;
let defaultSessionLength = 25;
let defaultTimeLeft = '25.00';
let sessionInterval;
let breakInterval;
let switcher = 0;

function resetTimers() {
  clearInterval(sessionInterval);
  sessionInterval = undefined;
  clearInterval(breakInterval);
  breakInterval = undefined;
  defaultBreakLength = 5;
  defaultSessionLength = 25;
  defaultTimeLeft = '25.00';
  switcher = 0;
  document.getElementById("timer-label").innerHTML = "Session time";
  document.getElementById("break-length").innerHTML = defaultBreakLength;
  document.getElementById("session-length").innerHTML = defaultSessionLength;
  document.getElementById("time-left").innerHTML = defaultTimeLeft;
}


function changeBreakLength(e) {
  if (e.target.id === 'break-decrement') {
    defaultBreakLength -= 1;
    console.log("break length decreased");
    if (defaultBreakLength <= 0) {
      defaultBreakLength += 1;
    }
    document.getElementById("break-length").innerHTML = defaultBreakLength;
  } else {
    defaultBreakLength += 1;
    console.log("break length increased");
    if (defaultBreakLength > 60) {
      defaultBreakLength -= 1;
    }
  }
  document.getElementById("break-length").innerHTML = defaultBreakLength;
}


function changeSessionLength(e) {
  if (e.target.id === 'session-decrement') {
    defaultSessionLength -= 1;
    console.log("session length decreased");
    if (defaultSessionLength <= 0) {
      defaultSessionLength += 1
    }
    document.getElementById("session-length").innerHTML = defaultSessionLength;
  } else {
    defaultSessionLength += 1;
    console.log("session length increased");
    if (defaultSessionLength > 60) {
      defaultSessionLength -= 1;
    }
    document.getElementById("session-length").innerHTML = defaultSessionLength;
  }
}

function playAndStop() {
  if (sessionInterval === undefined && breakInterval === undefined) {
    switcher = 1;
    defaultSessionTimer();
    console.log(switcher + " first time")
  } else if (sessionInterval) {
    if (switcher === 1) {
      console.log(switcher + " sessionInterval")
      switcher = 0;
      document.getElementById('timer-label').innerHTML = 'session paused'
      clearInterval(sessionInterval);
    } else if (switcher === 0) {
      console.log(switcher + " restarting")
      switcher = 1;
      restartedSessionTimer()
    }
  } else if (breakInterval) {
    if (switcher === 1) {
      console.log(switcher + " breakInterval")
      switcher = 0;
      document.getElementById('timer-label').innerHTML = 'break paused'
      clearInterval(breakInterval);
    } else if (switcher === 0) {
      console.log(switcher + " restarting")
      switcher = 1;
      restartedBreakTimer()
    }
  }
}

function defaultSessionTimer() {
  timeLeft = new Date();
  timeLeft.setMinutes(defaultSessionLength);
  timeLeft.setSeconds(0);
  let minutes = timeLeft.getMinutes();
  let seconds = timeLeft.getSeconds();

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  document.getElementById('time-left').innerHTML = minutes + ":0" + seconds; console.log("default session " + document.getElementById('time-left').innerHTML);  document.getElementById('timer-label').innerHTML = 'default session running'

  sessionInterval = setInterval(function() {
    timeLeft.setSeconds(timeLeft.getSeconds() -1);
    minutes = timeLeft.getMinutes();
    seconds = timeLeft.getSeconds();

    if (minutes < 10) {
      minutes = "0" + minutes;
    }

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    if (minutes == 00 && seconds == 00) {
      clearInterval(sessionInterval);
      sessionInterval = undefined;
      defaultBreakTimer();
    }
    document.getElementById('time-left').innerHTML = minutes + ":" + seconds;
    console.log("default session " + document.getElementById('time-left').innerHTML);
  }, 1000);
}

function restartedSessionTimer() {
  timeLeft = new Date();
  let display = document.getElementById('time-left').innerHTML;
  timeLeft.setMinutes(display.charAt(0).concat(display.charAt(1)));
  timeLeft.setSeconds(display.charAt(3).concat(display.charAt(4)));
  let minutes = timeLeft.getMinutes();
  let seconds = timeLeft.getSeconds();

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  document.getElementById('time-left').innerHTML = minutes + ":" + seconds; console.log("default session " + document.getElementById('time-left').innerHTML);  document.getElementById('timer-label').innerHTML = 'restarted session running'

  sessionInterval = setInterval(function() {
    timeLeft.setSeconds(timeLeft.getSeconds() -1);
    minutes = timeLeft.getMinutes();
    seconds = timeLeft.getSeconds();

    if (minutes < 10) {
      minutes = "0" + minutes;
    }

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    if (minutes == 00 && seconds == 00) {
      clearInterval(sessionInterval);
      sessionInterval = undefined;
      defaultBreakTimer();
    }
    document.getElementById('time-left').innerHTML = minutes + ":" + seconds;
    console.log("default session " + document.getElementById('time-left').innerHTML);
  }, 1000);
}

function defaultBreakTimer() {
  timeLeft = new Date();
  timeLeft.setMinutes(defaultBreakLength);
  timeLeft.setSeconds(0);
  let minutes = timeLeft.getMinutes();
  let seconds = timeLeft.getSeconds();

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

setTimeout(function(){
  document.getElementById('time-left').innerHTML = minutes + ":0" + seconds;  console.log("default break " + document.getElementById('time-left').innerHTML);      document.getElementById('timer-label').innerHTML = 'default break running';

breakInterval = setInterval(function() {
  timeLeft.setSeconds(timeLeft.getSeconds() -1);
  minutes = timeLeft.getMinutes();
  seconds = timeLeft.getSeconds();

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  if (minutes == 00 && seconds == 00) {
    clearInterval(breakInterval);
    breakInterval = undefined;
    setTimeout(function() {defaultSessionTimer()}, 1000);
  }
  document.getElementById('time-left').innerHTML = minutes + ":" + seconds;
  console.log("default break " + document.getElementById('time-left').innerHTML);
}, 1000);
}, 1000)
}

function restartedBreakTimer() {
  timeLeft = new Date();
  let display = document.getElementById('time-left').innerHTML;
  timeLeft.setMinutes(display.charAt(0).concat(display.charAt(1)));
  timeLeft.setSeconds(display.charAt(3).concat(display.charAt(4)));
  let minutes = timeLeft.getMinutes();
  let seconds = timeLeft.getSeconds();

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

setTimeout(function(){
  document.getElementById('time-left').innerHTML = minutes + ":" + seconds;  console.log("default break " + document.getElementById('time-left').innerHTML);      document.getElementById('timer-label').innerHTML = 'restarted break running';

breakInterval = setInterval(function() {
  timeLeft.setSeconds(timeLeft.getSeconds() -1);
  minutes = timeLeft.getMinutes();
  seconds = timeLeft.getSeconds();

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  if (minutes == 00 && seconds == 00) {
    clearInterval(breakInterval);
    breakInterval = undefined;
    setTimeout(function() {defaultSessionTimer()}, 1000);
  }
  document.getElementById('time-left').innerHTML = minutes + ":" + seconds;
  console.log("default break " + document.getElementById('time-left').innerHTML);
}, 1000);
}, 1000)
}

document.getElementById("reset").addEventListener('click', resetTimers);
document.getElementById("break-decrement").addEventListener('click', changeBreakLength);
document.getElementById("break-increment").addEventListener('click', changeBreakLength);
document.getElementById("session-decrement").addEventListener('click', changeSessionLength);
document.getElementById("session-increment").addEventListener('click', changeSessionLength);
document.getElementById("start_stop").addEventListener('click', playAndStop);
