import s from './app.module.scss';

import * as Comlink from 'comlink';
import { saveAs } from 'file-saver'

import React, { Component } from 'react'
import cn from 'classnames'
import { DownloadCloud } from 'react-feather'

import { drawImageByBlock } from 'src/utils/image.helper'
import { removeChildren } from 'src/utils/dom.helper'
// eslint-disable-next-line import/no-webpack-loader-syntax
import { drawOffscreenCanvas, downloadImage } from 'comlink-loader?singleton!src/worker/offscreen.worker';

import ImageInput from 'src/components/image-input'
import ImageHandler from 'src/components/image-handler'

class App extends Component {
  state = {
    previewUrls: [],
    imageData: [],
    files: [],
    canDownload: false,
  }

  selectImages = len => {
    this.setState(p => ({
      imageData: [
        ...p.imageData,
        ...Array(len).fill(null)
      ]
    }))
  }

  handleFiles = files => {
    this.setState(p => ({
      files: p.files.concat(files),
    }))
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

  // todo: may be laggy
  download = async ev => {
    ev.preventDefault()
    const [bitmaps, data] = await drawImageByBlock(this.state.imageData)
    const blob = await downloadImage(Comlink.transfer({ bitmaps, data }, bitmaps))
    await saveAs(blob, `pinn-image.png`)
  }

  drawPreview = async images => {
    const [bitmaps, data] = await drawImageByBlock(images)
    const dw = 300

    const container = document.querySelector(`#final-preview`)
    removeChildren(container, 'CANVAS')

    const canvas = document.createElement(`canvas`)
    container.appendChild(canvas)
    const offscreen = canvas.transferControlToOffscreen()
    await drawOffscreenCanvas(Comlink.transfer({ data, bitmaps, dw, offscreen }, [...bitmaps, offscreen]))
    this.setState({
      canDownload: true
    })
  }

  collectImageData = (imgRef, topPos, selectH, offsetHeight, imageIdx, always = false) => {
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
    const { files, canDownload } = this.state

    return (
      <div className={s.app}>
        <ImageInput
          onFilesReady={this.handleFiles}
          onSelectImages={this.selectImages}
        />

        <div className={s.btnGroup}>
          <a
            href='#pinn-btn'
            className={cn('button is-link is-light', s.pinnBtn)}
            onClick={this.generateImg}
          >
            Pinn!
          </a>
        </div>

        <div
          className={s.selectedPics}
        >
          <div className={s.fileList}>
            {files.length > 0
            && files.map(this.renderImgHandler)}
          </div>

          <div id={'final-preview'} className={s.finalPreview}>
            {
              canDownload &&
                <div className={s.download}>
                  <DownloadCloud
                    color={`#fd0f5e`}
                    size={`5rem`}
                    onClick={this.download}
                  />
                </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
