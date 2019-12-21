import s from './app.module.scss';

import React, { Component } from 'react';


import ImageInput from './components/ImageInput'
import ImageHandler from './components/ImageHandler'

import { mergeImages, downloadImage, cropImage } from './utils/image-helper'

class App extends Component {
  state = {
    previewUrls: [],
    cropped: []
  }

  componentDidMount() {
    this.cropImage = cropImage()
  }

  handleImages = urls => {
    const { previewUrls } = this.state
    const next = previewUrls.concat(urls)

    this.setState({
      previewUrls: next
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

  generateImg = (ev) => {
    ev.preventDefault()
    const { cropped } = this.state
    mergeImages(cropped)
      .then(data => {
        downloadImage(data)
      })
  }

  renderImgHandler = (url, idx) => {
    let extraOption = {}
    if (!idx) {
      extraOption = {
        topPos: 1,
        botPos: 1,
        forceLocked: true
      }
    }

    return <ImageHandler
      key={`img-${idx}`}
      imageIdx={idx}
      imageSrc={url}
      onRemoveImage={this.removeImg(idx)}
      onUpdateCrop={this.updateCroppedImage(idx)}
      onCropImage={this.cropImage}
      {...extraOption}
    />
  }

  render() {
    const { previewUrls } = this.state

    return (
      <div className={s.app}>
        <ImageInput
          onImagesReady={this.handleImages}
        />

        <a
          href='#pinn-btn'
          className='button is-dark'
          onClick={this.generateImg}
        >
          Pinn!
        </a>

        <div
          className={s.selectedPics}
        >
          <div className={s.fileList}>
            {previewUrls.length > 0
            && previewUrls.map(this.renderImgHandler)}
          </div>

{/*
          <div className={s.preview}>
            {cropped.map((imgSrc, idx) =>
              <img
                alt=''
                key={`crop-${idx}`}
                src={imgSrc}
              />
            )}
          </div>
*/}

          <div id={'finalPreview'}>
            <canvas />
          </div>
        </div>
      </div>
    );
  }
}

export default App;