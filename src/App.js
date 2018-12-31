import './App.css';

import React, { Component } from 'react';

import ImageInput from './components/ImageInput'
import ImageHandler from './components/ImageHandler'

class App extends Component {
  state = {
    previewUrls: []
  }

  handleImages = urls => {
    const { previewUrls } = this.state
    this.setState({
      previewUrls: previewUrls.concat(urls)
    })
  }

  removeImg = idx => () => {
    const { previewUrls } = this.state
    this.setState({
      previewUrls: [
        ...previewUrls.slice(0, idx),
        ...previewUrls.slice(idx + 1)
      ]
    })
  }

  render() {
    const { previewUrls } = this.state

    return (
      <div className='App'>
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
              onRemoveImage={this.removeImg(idx)}
            />
          )
        }
      </div>
    );
  }
}

export default App;
