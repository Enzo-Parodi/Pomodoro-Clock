let defaultBreakLength = 5;
let defaultSessionLength = 25;
let defaultTimeLeft = '25.00';
let sessionInterval;
let breakInterval;
let counter = 1;

function resetTimers() {
  clearInterval(sessionInterval);
  clearInterval(breakInterval);
  defaultBreakLength = 5;
  defaultSessionLength = 25;
  defaultTimeLeft = '25.00';
  counter = 1;
  document.getElementById("timer-label").innerHTML = "Session time";
  document.getElementById("break-length").innerHTML = defaultBreakLength;
  document.getElementById("session-length").innerHTML = defaultSessionLength;
  document.getElementById("time-left").innerHTML = defaultTimeLeft;
}


function changeBreakLength(e) {
  if (e.target.id === 'break-decrement') {
    defaultBreakLength -= 1;
    if (defaultBreakLength <= 0) {
      defaultBreakLength += 1;
    }
    document.getElementById("break-length").innerHTML = defaultBreakLength;
  } else {
    defaultBreakLength += 1;
    if (defaultBreakLength > 60) {
      defaultBreakLength -= 1;
    }
  }
  document.getElementById("break-length").innerHTML = defaultBreakLength;
}


function changeSessionLength(e) {
  if (e.target.id === 'session-decrement') {
    defaultSessionLength -= 1;
    if (defaultSessionLength <= 0) {
      defaultSessionLength += 1
    }
    document.getElementById("session-length").innerHTML = defaultSessionLength;
  } else {
    defaultSessionLength += 1;
    if (defaultSessionLength > 60) {
      defaultSessionLength -= 1;
    }
    document.getElementById("session-length").innerHTML = defaultSessionLength;
  }
}

//Timer ONLY of session.
function sessionTimer(e) {
  let timeLeft;//This is the timer shown in "#time-left"

  if (counter === 1) {
    counter +=1;
    timeLeft = new Date();
    timeLeft.setMinutes(defaultSessionLength -1);
    timeLeft.setSeconds(59);
    let minutes = timeLeft.getMinutes();
    let seconds = timeLeft.getSeconds();

    sessionInterval = setInterval(function() {
      minutes = timeLeft.getMinutes();
      seconds = timeLeft.getSeconds();

      if (minutes < 10) {
        minutes = "0" + minutes;
      }

      if (seconds < 10) {
        seconds = "0" + seconds;
      }

      if (minutes == 00 && seconds == 00) {
        document.getElementById("timer-label").innerHTML = "Break has begun";
        counter = 1;
        clearInterval(sessionInterval);
        breakTimer();
        console.log("after clear AND breaktimer - counter 1")
      }

      timeLeft.setSeconds(timeLeft.getSeconds() - 1);
      document.getElementById("time-left").innerHTML = minutes + ":" + seconds;

      console.log(counter + " session length left is " + minutes + ":" + seconds);
    }, 1000);
  } else if (counter % 2 !== 0) {
    counter +=1;
    timeLeft = new Date();
    let display = document.getElementById("time-left").innerHTML;

    timeLeft.setMinutes(display.charAt(0).concat(display.charAt(1)));
    timeLeft.setSeconds(display.charAt(3).concat(display.charAt(4)));
    let minutes = timeLeft.getMinutes();
    let seconds = timeLeft.getSeconds();

    if (minutes < 10) {
      minutes = "0" + minutes;
    }

    if (seconds < 10) {
      seconds = "0" + seconds
    }

    timeLeft.setSeconds(timeLeft.getSeconds() - 1);
    document.getElementById("time-left").innerHTML = minutes + ":" + seconds;

    sessionInterval = setInterval(function() {
      minutes = timeLeft.getMinutes();
      seconds = timeLeft.getSeconds();
      if (minutes < 10) {
        minutes = "0" + minutes;
      }

      if (seconds < 10) {
        seconds = "0" + seconds
      }

      if (minutes == 00 && seconds == 00) {
        document.getElementById("timer-label").innerHTML = "Break has begun";
        counter = 1;
        console.log("before clear - counter: " + counter)
        clearInterval(sessionInterval);
        console.log("after clear - counter: " + counter)
        breakTimer();
      }

      timeLeft.setSeconds(timeLeft.getSeconds() - 1);
      document.getElementById("time-left").innerHTML = minutes + ":" + seconds;
      if (minutes == 00 && seconds == 00) {
        console.log("session finished");
        counter = 1;
        clearInterval(sessionInterval);
      }
      console.log(counter + " session length left is " + minutes + ":" + seconds);
    }, 1000);
  } else if (sessionInterval){
    counter +=1;
    console.log(counter + "STOPPED session length left is " + document.getElementById("time-left").innerHTML);
    clearInterval(sessionInterval);
  }
}

function breakTimer() {
  let timeLeft;
  console.log("at breakTimer start, counter is " + counter);

  if (counter === 1) {
    counter += 1;

    setTimeout(function(){
      if (defaultBreakLength < 10) {
        defaultBreakLength = "0" + defaultBreakLength;
      }
      document.getElementById("time-left").innerHTML = defaultBreakLength + ":00";
    }, 1000);
    console.log(counter + " breakTimer started at " + defaultTimeLeft)

    timeLeft = new Date();
    timeLeft.setMinutes(defaultBreakLength -1);
    timeLeft.setSeconds(59);
    let minutes = timeLeft.getMinutes();
    let seconds = timeLeft.getSeconds();

    breakInterval = setInterval(function() {
      minutes = timeLeft.getMinutes();
      seconds = timeLeft.getSeconds();
      if (minutes < 10) {
        minutes = "0" + minutes;
      }

      if (seconds < 10) {
        seconds = "0" + seconds;

      }

      if (minutes == 00 && seconds == 00) {
        document.getElementById("timer-label").innerHTML = "Back to work!";
        counter = 1;
        clearInterval(breakInterval);
        sessionTimer();
      }

      timeLeft.setSeconds(timeLeft.getSeconds() - 1);
      document.getElementById("time-left").innerHTML = minutes + ":" + seconds;
      console.log(counter + " break length left is " + minutes + ":" + seconds);
    }, 1000);
  } else if (counter % 2 !== 0) {
    counter += 1;
    timeLeft = new Date();
    let display = document.getElementById("time-left").innerHTML;

    timeLeft.setMinutes(display.charAt(0).concat(display.charAt(1)));
    timeLeft.setSeconds(display.charAt(3).concat(display.charAt(4)));
    let minutes = timeLeft.getMinutes();
    let seconds = timeLeft.getSeconds();

    if (minutes < 10) {
      minutes = "0" + minutes;
    }

    if (seconds < 10) {
      seconds = "0" + seconds
    }

    timeLeft.setSeconds(timeLeft.getSeconds() - 1);
    document.getElementById("time-left").innerHTML = minutes + ":" + seconds;

    breakInterval = setInterval(function() {
      minutes = timeLeft.getMinutes();
      seconds = timeLeft.getSeconds();
      if (minutes < 10) {
        minutes = "0" + minutes;
      }

      if (seconds < 10) {
        seconds = "0" + seconds
      }

      if (minutes == 00 && seconds == 00) {
        document.getElementById("timer-label").innerHTML = "Break time is over";
        counter = 1;
        clearInterval(breakInterval);
        sessionTimer();
      }

      timeLeft.setSeconds(timeLeft.getSeconds() - 1);
      document.getElementById("time-left").innerHTML = minutes + ":" + seconds;
      if (minutes == 00 && seconds == 00) {
        console.log("time's up!");
        counter = 1;
        return;
      }
      console.log(counter + " break length left is " + minutes + ":" + seconds);
    }, 1000);
  } else if (breakInterval){
    counter += 1;
    clearInterval(breakInterval);
    console.log(counter + " break should stop!");
  }
}



document.getElementById("reset").addEventListener('click', resetTimers);
document.getElementById("break-decrement").addEventListener('click', changeBreakLength);
document.getElementById("break-increment").addEventListener('click', changeBreakLength);
document.getElementById("session-decrement").addEventListener('click', changeSessionLength);
document.getElementById("session-increment").addEventListener('click', changeSessionLength);
document.getElementById("start_stop").addEventListener('click', sessionTimer);
