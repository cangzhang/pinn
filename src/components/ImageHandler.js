import './image-handler.css'

import React from 'react'

const cropImage = (src, sy, sh, containerHeight) => {
  let canvas
  const img = new Image()

  return new Promise((resolve, reject) => {
    if (!canvas)
      canvas = document.createElement('canvas')

    const ctx = canvas.getContext('2d')

    img.onload = function () {
      const scaledH = (this.height / containerHeight) * sh
      const scaledSy = (this.height / containerHeight) * sy

      canvas.width = this.width
      canvas.height = this.height
      ctx.drawImage(
        this,
        0, scaledSy, this.width, scaledH,
        0, 0, this.width, scaledH,
      )

      img.onerror = function () {
        reject('Error: Unable to load image.')
      }

      const data = canvas.toDataURL()
      resolve(data)
    }
    img.src = src
  })
}

export default class ImageHandler extends React.Component {
  topRef = null
  containerRef = null
  imgHolder = null

  state = {
    topPos: 100,
    botPos: 20,
  }

  componentDidMount() {
  }

  handleDragStart = ev => {
  }


  handleDrop = (elName, varName, isBot = true) => ev => {
    const { offsetTop, offsetHeight } = this.containerRef
    const barPosition = ev.pageY
    let pos = barPosition - offsetTop
    console.log('drag end: ', pos)
    if (pos < 0) {
      pos = 0
    }
    if (isBot) {
      pos = offsetHeight - pos
    }

    this.setState({
      [varName]: pos
    }, () => {
      const { topPos, botPos } = this.state
      const selectH = offsetHeight - topPos - botPos
      cropImage(this.props.imageSrc, topPos, selectH, offsetHeight)
        .then(data => {
          console.log(data)
        })
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
          alt={''}
          className="img-container"
          ref={this.getRef('imgHolder')}
          src={imageSrc}
        />

        <div
          className="overlay-indicator"
          style={{
            top: 0,
            height: `${topPos}px`,
          }}
        />

        <div
          className={'select-handler top'}
          style={{
            top: `${topPos}px`
          }}
          ref={this.getRef('topRef')}
          draggable={true}
          onDrag={this.handleDragStart}
          onDragEnd={this.handleDrop('topRef', 'topPos', false)}
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