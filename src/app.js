import s from './app.module.scss';

import * as Comlink from 'comlink';
import React, { Component } from 'react'
import { saveAs } from 'file-saver'

import { drawImageByBlock } from 'src/utils/image.helper'
// eslint-disable-next-line import/no-webpack-loader-syntax
import { drawOneImage } from 'comlink-loader?singleton!src/worker/offscreen.worker';

import ImageInput from 'src/components/image-input'
import ImageHandler from 'src/components/image-handler'

class App extends Component {
  state = {
    previewUrls: [],
    cropped: [],
    imageData: [],
    files: [],
  }

  selectImages = len => {
    this.setState({
      imageData: Array(len).fill(null)
    })
  }

  handleFiles = files => {
    this.setState({
      files,
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

  // todo
  download = () => {
    document.querySelector('#final-preview > canvas')
      .toBlob((blob) => {
        saveAs(blob, `pinned-image.png`);
      });
  }

  collectImageData = async (imgRef, topPos, selectH, offsetHeight, imageIdx) => {
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

    const canvas = document.querySelector('#final-preview > canvas').transferControlToOffscreen();
    const [bitmaps, data] = await drawImageByBlock(next)
    await drawOneImage(Comlink.transfer({ data, canvas, bitmaps }, [...bitmaps, canvas]))
  }

  onImageLoad = file => () => {
    window.URL.revokeObjectURL(file)
  }

  renderImgHandler = (file, idx) => {
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
      imageSrc={file}
      onRemoveImage={this.removeImg(idx)}
      onUpdateCrop={this.updateCroppedImage(idx)}
      onCollectImageData={this.collectImageData}
      onImageLoad={this.onImageLoad(file)}
      {...extraOption}
    />
  }

  render() {
    const { files } = this.state

    return (
      <div className={s.app}>
        <ImageInput
          onFilesReady={this.handleFiles}
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
            {files.length > 0
            && files.map(this.renderImgHandler)}
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

          <div id={'final-preview'}>
            <canvas width={300} height={3000}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
