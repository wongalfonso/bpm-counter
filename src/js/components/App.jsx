import React, { Component } from 'react';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tapCounter: 0,
      averageBPM: 0,
      BPM: 0,
      timer: 0,      
      intervalArr : [],
    }
    this.handleClick = this.handleClick.bind(this);
    this.startTimer = this.startTimer.bind(this);
  }

  componentWillMount() {
    document.addEventListener('keydown', (event) => {
      if (event.keyCode == '32') {
        this.handleClick(this.state.tapCounter + 1);
      }
    })
  }
  startTimer() {
    setInterval(() => {
      let currentTime = this.state.timer + 100;
      if (currentTime > 180000) {
        currentTime = 0
      }
      this.setState({
        timer: currentTime
      })
    }, 100) 
  }

  handleClick(count) {
    let intArr = [], averageArr = [], average, interval, minute, bpm;
    if (this.state.intervalArr.length > 0) {
      intArr = this.state.intervalArr;
    }
    intArr.push(this.state.timer);
    this.state.timer < 1 && this.startTimer();        
    if (intArr.length > 1) {
      for (let i = 1; i < intArr.length; i ++) {
        interval = intArr[i] - intArr[i - 1];
        averageArr.push(interval);
        if (averageArr.length > 20) {
          averageArr.shift();
        }
      }
      if (intArr.length > 20) {
        intArr.shift();
      }
    } else {
      averageArr.push(0)
    }    
    average = averageArr.reduce((total, num) => total + num);  
    average = average / averageArr.length;  
    if (this.state.timer > 60000) {
      minute = Math.ceil(this.state.timer/60000);
    } else {
      minute = 60000
    }
    if (average === 0) {
      bpm = 60;
    } else {
      bpm = minute / average;
    }        
    this.setState({
      tapCounter: count,
      intervalArr: intArr,
      average: average,
      averageBPM: Math.round(bpm),
      BPM: bpm.toFixed(2),      
    })
  }

  render() {    
    return (
      <div className = 'full-page'>
        <div className="container">
          <div className="counters">
            <span>Average BPM</span>
            <div className="main-counter">{this.state.averageBPM}</div>
            <span>BMP</span>
            <div className="average-counter">{this.state.BPM}</div>
            <span>Tap Count</span>
            <div className="tap-counter">{this.state.tapCounter}</div>
            <button className = 'button-counter' onClick = {() => this.handleClick(this.state.tapCounter + 1)}>Tap to Count</button>
          </div>
        </div>
      </div>
    )
  }
}