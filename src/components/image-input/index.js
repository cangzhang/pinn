import s from './image-input.module.scss'

import React from 'react'

export default class ImageInput extends React.Component {
  inputRef = null

  state = {
    files: [],
    previewUrls: []
  }

  handleImageChosen = ev => {
    const files = ev.target.files

    this.props.onSelectImages(files.length || 0)
    const res = Array.from(files)
      .map(f => window.URL.createObjectURL(f))

    this.setState({
      files: res
    })
    this.props.onFilesReady(res)
  }

  createInputRef = e => this.inputRef = e

  render() {
    return (
      <div className={s.imageInput}>
        <div className='file is-boxed'>
          <label className='file-label'>
            <input
              type='file'
              accept='image/*'
              multiple='multiple'
              className='file-input'
              ref={this.createInputRef}
              onChange={this.handleImageChosen}
            />
            <span className='file-cta'>
              <span className='file-icon'>
                <i className='ion ion-md-cloud-upload'/>
              </span>
              <span className='file-label'>
                Add picture(s)
              </span>
            </span>
          </label>
        </div>
      </div>
    )
  }
}
