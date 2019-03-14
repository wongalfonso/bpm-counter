import React, { Component } from 'react';
import Counter from './Counter';
import Start from './Start';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startTimer: null,      
    }  
    this.resetTimer = this.resetTimer.bind(this);
  }
  

  resetTimer() {
    this.setState({
      startTimer: null
    })
  }
  render() {    
    const { startTimer } = this.state;
    return (
      <div className = 'full-page'>
        <div className="container">
          {startTimer ? 
            <Counter
            Reset = {() => this.setState({startTimer: null})}/>
            :  
            <Start
            Start = {() => this.setState({startTimer: true})}
            />
        }
        </div>
      </div>
    )
  }
}