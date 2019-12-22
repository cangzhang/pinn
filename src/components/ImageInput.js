import './image-input.css'

import React from 'react'

export default class ImageReader extends React.Component {
  inputRef = null

  state = {
    files: [],
    previewUrls: []
  }

  handleImageChosen = ev => {
    const files = ev.target.files

    this.props.onSelectImages(files.length || 0)

    this.setState({
      files
    })
    Object.keys(files).forEach((cur, idx) => {
      const reader = new FileReader()
      reader.readAsDataURL(files[cur])
      reader.onloadend = () => {
        const { previewUrls } = this.state
        previewUrls[idx] = reader.result
        this.setState({
          previewUrls
        }, () => {
          if (previewUrls.length === files.length) {
            this.props.onImagesReady(previewUrls)
          }
        })
      }
    })
  }

  createInputRef = e => this.inputRef = e

  render() {
    return (
      <div className='image-input'>
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
                Choose File(s)
              </span>
            </span>
          </label>
        </div>
        </div>
    )
  }
}
