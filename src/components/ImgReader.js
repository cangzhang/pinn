import React from 'react'

export default class ImageReader extends React.Component {
  inputRef = null

  state = {
    files: [],
    previewUrls: []
  }

  handleImageChosen = ev => {
    const files = ev.target.files
    // const data = URL.createObjectURL(files[0])

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
        })
      }
    })
  }

  createInputRef = e => this.inputRef = e

  render() {
    const { previewUrls } = this.state

    return (
      <div className='image-reader'>
        <input
          type='file'
          accept='image/*'
          multiple='multiple'
          className='file'
          ref={this.createInputRef}
          onChange={this.handleImageChosen}
        />

        <div className="file is-boxed">
          <label className="file-label">
            <input className="file-input" type="file"/>
            <span className="file-cta">
      <span className="file-icon">
        <i className="ion ion-md-cloud-upload"/>
      </span>
      <span className="file-label">
        Choose a file…
      </span>
    </span>
          </label>
        </div>

        {previewUrls.map((url, key) =>
          <img
            alt={''}
            className={'image'}
            key={key}
            src={url}
          />)}
      </div>
    )
  }
}
