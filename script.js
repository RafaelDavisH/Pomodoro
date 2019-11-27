let pomodoro = {
    started : false,
    isTimerRunning : false,
    minutes : 0,
    seconds : 0,
    interval: null,
    minutesDom : null,
    secondsDom : null,
    init : function() {
        let self = this;
        this.breakDom = document.querySelector('#break').style.display = "none";
        this.minutesDom = document.querySelector('#timer__minutes');
        this.secondsDom = document.querySelector('#timer__seconds');
        this.interval = setInterval(function() {
            self.intervalCallback.apply(self);
        }, 1000);
        let pdWork = document.querySelector('#work');
        pdWork.innerHTML = "Work";
        pdWork.onclick = function() {
            self.startWork.apply(self);
        };
        let pdBreak = document.querySelector("#break");
        pdBreak.innerHTML = "Break";
        pdBreak.onclick = function() {
          self.startBreak.apply(self);
        };
        let reset = document.querySelector('#reset');
        reset.innerHTML = "Reset";
        reset.onclick = function() {
            self.resetTimer.apply(self);
        };
        let pdPause = document.querySelector('#pause');
        pdPause.innerHTML = "Pause";
        pdPause.onclick = function(){ 
            pdPause.innerHTML = (pdPause.innerHTML == "Pause") ? "Restart" : "Pause";
            self.pauseTimer.apply(self);
        }
    },
    resetVariables : function(mins, secs, started) {
        this.minutes = mins;
        this.seconds = secs;
        this.started = started;
    },
    startWork : function() {
      this.isTimerRunning = true;
      this.resetVariables(25, 0, true);
    },
    startBreak : function() {
      this.isTimerRunning = true;
      this.resetVariables(5, 0, true);
    },
    resetTimer : function() {
        (this.isTimerRunning == true) ? this.resetVariables(25, 0, false): this.resetVariables(5, 0, false);
        this.updateDom();
    },
    pauseTimer : function() {
        this.isTimerRunning = (this.isTimerRunning == false) ? true : false;
    },
    toDoubleDigit : function(num) {
        if(num < 10) {
            return "0" + parseInt(num, 10);
        }
        return num;
    },
    updateDom : function() {
        this.minutesDom.innerHTML = this.toDoubleDigit(this.minutes);
        this.secondsDom.innerHTML = this.toDoubleDigit(this.seconds);
    },
    intervalCallback : function() {
        if(!this.started) return false;
        if(this.isTimerRunning) {
          if(this.seconds == 0) {
              if(this.minutes == 0) {
                let pdBreak =document.querySelector('#break');
                pdBreak.style.display = (pdBreak.style.display == "inline") ?"none" : "inline";
                let pdWork = document.querySelector('#work');
                pdWork.style.display = (pdWork.style.display == "none") ? "inline" : "none";
                this.timerComplete();
                return;                  
              }
              this.seconds = 59;
              this.minutes--;
          } else {
              this.seconds--;
          }
          this.updateDom();
        }
    },
    timerComplete : function() {
        this.started = false;
    }
};
window.onload = function() {
    pomodoro.init();
};