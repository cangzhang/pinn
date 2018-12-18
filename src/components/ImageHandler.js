import './image-handler.css'

import React from 'react'

export default class ImageHandler extends React.Component {
  componentDidMount() {
    console.log(this.props.imageIdx, 'ready')
  }

  handleDragStart = ev => {
    console.log('drag start')
  }

  handleDragStop = ev => {
    console.log('end')
  }

  render() {
    const { imageSrc } = this.props
    return (
      <div
        className="image-handler-container"
        style={{
          position: 'relative',
        }}
      >
        <img
          alt=""
          src={imageSrc}
        />

        <div
          className={'select-handler top'}
          onMouseDown={this.handleDragStart}
          onMouseMove={this.handleDragStop}
        />
        <div className={'select-handler bottom'}/>
      </div>
    )
  }
}