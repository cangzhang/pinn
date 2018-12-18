import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import ImageInput from './components/ImageInput'
import ImageHandler from './components/ImageHandler'

class App extends Component {
  state = {
    previewUrls: []
  }

  handleImages = previewUrls => {
    this.setState({
      previewUrls
    })
  }

  render() {
    const { previewUrls } = this.state

    return (
      <div className="App">
        <img src={logo} className="App-logo" alt="logo"/>

        <ImageInput
          onImagesReady={this.handleImages}
        />

        {
          previewUrls.length > 0
          && previewUrls.map((url, idx) =>
            <ImageHandler
              key={`img-${idx}`}
              imageIdx={idx}
              imageSrc={url}
            />
          )
        }
      </div>
    );
  }
}

export default App;
