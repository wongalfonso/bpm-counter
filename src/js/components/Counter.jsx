import React, { Component } from 'react';

export default class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: 0,
      tapCounter: 1,
      averageBPM: 0,
      bpm: 0,
      intervalArr: [],
      classAnim: 2,
      classArr: []
    }
    this.handleClick = this.handleClick.bind(this);
    this.counterSpaceBar = this.counterSpaceBar.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keyup', this.counterSpaceBar);
    this.interval = setInterval(() => {
      let currentTime = this.state.timer + 100;
      if (currentTime > 180000) {
        currentTime = 0;
      }
      this.setState({
        timer: currentTime
      })
    }, 100);
  }

  counterSpaceBar(event) {
    if (event.keyCode == '32') {
      this.handleClick(this.state.tapCounter + 1);
    }
  }

  handleClick(count) {
    let intArr = [], averageArr = [], classCheck = [], average, interval, minute, bpm, classNum;
    const { classAnim } = this.state;
    if (this.state.intervalArr.length > 0) {
      intArr = this.state.intervalArr;
    }
    intArr.push(this.state.timer);
    if (intArr.length > 1) {
      for (let i = 1; i < intArr.length; i++) {
        interval = intArr[i] - intArr[i - 1];        
        averageArr.push(interval);
        if (averageArr.length > 40) {
          averageArr.shift();
        }
      }
      if (intArr.length > 40) {
        intArr.shift();
      }
    } else {
      averageArr.push(0)
    }
    average = averageArr.reduce((total, num) => total + num);
    average = average / averageArr.length;   
    minute = 60000;

    if (averageArr.length == 1) {
      bpm = 60;
    } else {
      bpm = minute / average;
    }


    classCheck = this.state.classArr.slice();    
    classCheck.push(parseInt(bpm));
    if (classCheck.length > 2) {
      classCheck.shift();
    }
    console.log(classCheck);
    if (classCheck[1] > classCheck[0] || classCheck[1] < classCheck[0]) {
      if (classAnim > 7) {
        classNum = 8
      } else {
        classNum = classAnim + 1;
      }
    } else {
      if (classAnim < 1) {
        classNum = 0;
      } else {
        classNum = classAnim - 1;
      }
    }    
    this.setState({
      tapCounter: count,
      intervalArr: intArr,
      average: average,
      averageBPM: Math.round(bpm),
      BPM: bpm.toFixed(2),
      classAnim : classNum,
      classArr : classCheck
    })
    document.getElementById('counter-button').blur();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    window.removeEventListener('keyup', this.counterSpaceBar);
  }

  render() {
    // console.log(this.state.classAnim);
    return (
      <div className='counters'>
        <span>Average BPM</span>
        <div className={"main-counter main-counter-" + this.state.classAnim}>{this.state.averageBPM}</div>
        <span>BMP</span>
        <div className="average-counter">{this.state.BPM}</div>
        <span>Tap Counter</span>
        <div className="tap-counter">{this.state.tapCounter}</div>
        <button className='buttons buttons-reset' onClick={this.props.Reset}>Reset Counter</button>
        <button className='buttons buttons-counter' id='counter-button' onClick={() => this.handleClick(this.state.tapCounter + 1)}>Tap to Count</button>
      </div>
    )
  }
}