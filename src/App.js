import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import ImgReader from './components/ImgReader'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <ImgReader/>
        </header>
      </div>
    );
  }
}

export default App;
