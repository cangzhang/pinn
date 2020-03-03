import s from './image-input.module.scss'

import React from 'react'
import { Upload } from 'react-feather'

export default class ImageInput extends React.Component {
  inputRef = React.createRef()

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

  render() {
    return (
      <div className={s.imageInput}>
        <input
          type='file'
          accept='image/*'
          multiple='multiple'
          id={`file-input`}
          className={s.fileInput}
          ref={this.inputRef}
          onChange={this.handleImageChosen}
        />
        <Upload color={`#18BA88`} size={`2.6rem`}/>
        <label htmlFor="file-input">Choose file(s)</label>
      </div>
    )
  }
}
