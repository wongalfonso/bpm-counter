import React, { Component } from 'react';

export default class App extends Component {
  constructor(props) {
    super(props);

  }

  
  render() {
    return (
      <div className = 'full-page'>
        <div className="container">
          <div className="counter">100</div>
          <div className="average-counter">100</div>
          <div className="tap-counter">1</div>
        </div>
      </div>
    )
  }
}