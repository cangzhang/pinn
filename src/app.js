import s from './app.module.scss';

import React, { Component } from 'react'
import { saveAs } from 'file-saver'

import { mergeImages, downloadImage, preparePreview } from './utils/image-helper'

import ImageInput from './components/ImageInput'
import ImageHandler from './components/ImageHandler'

class App extends Component {
  state = {
    previewUrls: [],
    cropped: [],
    imageData: [],
  }

  componentDidMount() {
    this.worker = new Worker('./offscreen-canvas.worker', {
      name: 'offscreen-canvas.worker',
      type: 'module',
    })

    this.worker.onmessage = ev => {
      console.log('preview: ', ev.data)
    }
  }

  selectImages = len => {
    this.setState({
      imageData: Array(len).fill(null)
    })
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
  }

  download = () => {
    document.querySelector('#finalPreview > canvas')
      .toBlob((blob) => {
        saveAs(blob, `pinned-image.png`);
      });
  }

  collectImageData = (imgRef, topPos, selectH, offsetHeight, imageIdx) => {
    const { imageData } = this.state
    const next = [
      ...imageData.slice(0, imageIdx),
      { imgRef, topPos, selectH, offsetHeight, imageIdx },
      ...imageData.slice(imageIdx + 1)
    ]

    this.setState({
      imageData: next
    })

    const shouldShowPreview = next.every(Boolean)
    if (!shouldShowPreview) return

    preparePreview(next)
      .then(data => {
        this.worker.postMessage(data, [data.canvas])
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
      onCollectImageData={this.collectImageData}
      {...extraOption}
    />
  }

  render() {
    const { previewUrls } = this.state

    return (
      <div className={s.app}>
        <ImageInput
          onImagesReady={this.handleImages}
          onSelectImages={this.selectImages}
        />

        <div>
          <a
            href='#pinn-btn'
            className='button is-dark'
            onClick={this.generateImg}
          >
            Pinn!
          </a>
          <a
            style={{
              marginLeft: '20px'
            }}
            href='#download'
            className='button'
            onClick={this.download}
          >
            Download
          </a>
        </div>

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
            <canvas/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
