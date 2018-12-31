import './image-handler.css'

import { cropImage } from '../utils/utils'
import React from 'react'

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

  updateState = (_val, isTopOne = true, cb) => {
    const { offsetHeight } = this.containerRef
    const { topPos, botPos } = this.state

    let val = _val
    let distance = offsetHeight - botPos - val
    if (!isTopOne) {
      distance = offsetHeight - val - topPos
    }

    if (distance < 20) {
      val = offsetHeight - botPos - 20
      if (!isTopOne) {
        val = offsetHeight - topPos - 20
      }
    }

    let prop = isTopOne ? 'topPos' : 'botPos'
    this.setState({
      [prop]: val
    }, () => {
      cb && cb()
    })
  }

  handleDragStart = (isTopOne = true) => ev => {
    const { offsetTop, offsetHeight } = this.containerRef
    const { pageY } = ev

    let pos = pageY - offsetTop
    if (!isTopOne) {
      pos = offsetHeight + offsetTop - pageY
    }

    this.updateState(pos, isTopOne)
  }

  handleDrop = (isTopOne = true) => ev => {
    const { offsetTop, offsetHeight } = this.containerRef
    const barPosition = ev.pageY

    let pos = barPosition - offsetTop
    if (pos < 0) {
      pos = 0
    }

    if (!isTopOne) {
      pos = offsetHeight - pos
    }

    this.updateState(pos, isTopOne, () => {
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
          onDrag={this.handleDragStart()}
          onDragEnd={this.handleDrop()}
        />

        <div
          className={'select-handler bottom'}
          style={{
            bottom: `${botPos}px`
          }}
          ref={this.getRef('botRef')}
          draggable={true}
          onDrag={this.handleDragStart(false)}
          onDragEnd={this.handleDrop(false)}
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