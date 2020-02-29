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

  removeImg = idx => async () => {
    const { previewUrls, imageData, files } = this.state

    const newImageData = [
      ...imageData.slice(0, idx),
      ...imageData.slice(idx + 1)
    ]
    this.setState({
      files: [
        ...files.slice(0, idx),
        ...files.slice(idx + 1),
      ],
      previewUrls: [
        ...previewUrls.slice(0, idx),
        ...previewUrls.slice(idx + 1)
      ],
      imageData: newImageData
    })

    await this.drawPreview(newImageData)
  }

  generateImg = async () => {
    await this.drawPreview(this.state.imageData)
  }

  // todo
  download = () => {
    document.querySelector('#final-preview > canvas')
      .toBlob((blob) => {
        saveAs(blob, `pinned-image.png`);
      });
  }

  drawPreview = async (imageData) => {
    const [bitmaps, data] = await drawImageByBlock(imageData)
    const d = await drawOneImage(Comlink.transfer({ data, bitmaps }, [...bitmaps]))

    const preview = document.querySelector('#final-preview > canvas');
    const ctx = preview.getContext(`2d`)
    ctx.clearRect(0, 0, preview.width, preview.height)
    ctx.drawImage(d, 0, 0)
  }

  collectImageData = async (imgRef, topPos, selectH, offsetHeight, imageIdx, always = false) => {
    const { imageData } = this.state
    const next = [
      ...imageData.slice(0, imageIdx),
      { imgRef, topPos, selectH, offsetHeight, imageIdx },
      ...imageData.slice(imageIdx + 1)
    ]

    this.setState({
      imageData: next
    })

    const shouldShowPreview = next.every(Boolean) || always
    shouldShowPreview && this.drawPreview(next)
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
      key={`img-${file}`}
      imageIdx={idx}
      imageSrc={file}
      onRemoveImage={this.removeImg(idx)}
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

        <div className={s.btnGroup}>
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

          <div id={'final-preview'}>
            <canvas width={300} height={1000}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
