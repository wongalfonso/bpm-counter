import React, { Component } from 'react';

export default class Start extends Component {
  constructor() {
    super();
    this.startSpaceBar = this.startSpaceBar.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keyup', this.startSpaceBar);   
  }

  startSpaceBar(e) {            
    if (e.keyCode == '32') {        
      this.props.Start();
    }
  }
  componentWillUnmount() {
    window.removeEventListener('keyup', this.startSpaceBar);
  }
  render() {
    return (
      <div className="counters">
        <span>Average BPM</span>
        <div className="main-counter main-counter-2">0</div>
        <span>BMP</span>
        <div className="average-counter">0</div>
        <span>Tap Counter</span>
        <div className="tap-counter">0</div>
        <button className='buttons buttons-counter buttons-counter-start'
          id='counter-button'
          onClick={this.props.Start}>
          Tap to Count
            </button>
      </div>
    )
  }
}