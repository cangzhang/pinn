import './image-handler.css'

import React from 'react'

export default class ImageHandler extends React.Component {
  topRef = null
  containerRef = null

  state = {
    topPos: 100,
    botPos: 1,
  }

  componentDidMount() {
  }

  handleDragStart = ev => {
  }

  handleDrop = (elName, varName) => ev => {
    const { offsetTop, offsetHeight } = this.containerRef
    const barPosition = ev.pageY
    let top = barPosition - offsetTop
    console.log('drag end: ', top)
    if (top < 0) {
      top = 0
    }
    this.setState({
      [varName]: offsetHeight - top
    })
  }

  getRef = refName => el => {
    this[refName] = el
  }

  render() {
    const { imageSrc } = this.props
    const { topPos, botPos } = this.state

    return (
      <div
        className="image-handler-container"
        style={{
          position: 'relative',
        }}
        ref={this.getRef('containerRef')}
      >
        <img
          alt=""
          src={imageSrc}
        />

        <div
          className="overlay-indicator"
          style={{
            top: 0,
            height: `calc(100% - ${topPos}px)`,
          }}
        />

        <div
          className={'select-handler top'}
          style={{
            bottom: `${topPos}px`
          }}
          ref={this.getRef('topRef')}
          draggable={true}
          onDrag={this.handleDragStart}
          onDragEnd={this.handleDrop('topRef', 'topPos')}
        />
        <div
          className={'select-handler bottom'}
          style={{
            bottom: `${botPos}px`
          }}
          ref={this.getRef('botRef')}
          draggable={true}
          onDrag={this.handleDragStart}
          onDragEnd={this.handleDrop('botRef', 'botPos')}
        />

        <div
          className="overlay-indicator"
          style={{
            bottom: 0,
            height: `${botPos}px`,
          }}
        />

      </div>
    )
  }
}