import './App.css';

import React, { Component } from 'react';

import ImageInput from './components/ImageInput'
import ImageHandler from './components/ImageHandler'

class App extends Component {
  state = {
    previewUrls: [],
    cropped: []
  }

  handleImages = urls => {
    const { previewUrls } = this.state
    this.setState({
      previewUrls: previewUrls.concat(urls)
    })
  }

  removeImg = idx => () => {
    const { previewUrls, cropped } = this.state
    this.setState({
      previewUrls: [
        ...previewUrls.slice(0, idx),
        ...previewUrls.slice(idx + 1)
      ],
      cropped: [
        ...cropped.slice(0, idx),
        ...cropped.slice(idx + 1)
      ]
    })
  }

  updateCroppedImage = idx => data => {
    const { cropped } = this.state
    this.setState({
      cropped: [
        ...cropped.slice(0, idx),
        data,
        ...cropped.slice(idx + 1)
      ]
    })
  }

  render() {
    const { previewUrls, cropped } = this.state

    return (
      <div className='App'>
        <ImageInput
          onImagesReady={this.handleImages}
        />

        <div className='show-area' id='show-area'>
          <div className='file-list'>
            {previewUrls.length > 0
            && previewUrls.map((url, idx) =>
              <ImageHandler
                key={`img-${idx}`}
                imageIdx={idx}
                imageSrc={url}
                onRemoveImage={this.removeImg(idx)}
                onUpdateCrop={this.updateCroppedImage(idx)}
              />
            )}
          </div>

          <div className='preview'>
            {
              cropped.map((imgSrc, idx) => (
                <img
                  alt=''
                  key={`crop-${idx}`}
                  src={imgSrc}
                />
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
