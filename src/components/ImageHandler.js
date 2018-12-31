import './image-handler.css'

import { cropImage } from '../utils/utils'
import { IMAGE_WIDTH, MIN_GAP } from '../utils/constants'
import React from 'react'

export default class ImageHandler extends React.Component {
  topRef = null
  botRef = null
  containerRef = null
  imgRef = null

  state = {
    containerHeight: 'unset',
    topPos: 100,
    botPos: 20,
  }

  componentDidMount() {
  }

  onImgLoad = () => {
    const { naturalHeight, naturalWidth } = this.imgRef
    const containerHeight = `${(naturalHeight / naturalWidth) * IMAGE_WIDTH}px`

    this.setState({
      containerHeight
    })
  }

  updateState = (_val, isTopOne = true, cb) => {
    const { offsetHeight } = this.containerRef
    const { topPos, botPos } = this.state

    let val = _val
    let gap = offsetHeight - botPos - val
    if (!isTopOne) {
      gap = offsetHeight - val - topPos
    }

    if (gap < MIN_GAP) {
      val = offsetHeight - botPos - MIN_GAP
      if (!isTopOne) {
        val = offsetHeight - topPos - MIN_GAP
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
    if (!isTopOne) {
      pos = offsetHeight - pos
    }
    if (pos < 0) {
      pos = 0
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
    const { topPos, botPos, containerHeight } = this.state

    return (
      <div
        className="image-handler-container"
        style={{
          position: 'relative',
          width: `${IMAGE_WIDTH}px`,
          height: containerHeight
        }}
        ref={this.getRef('containerRef')}
      >
        <img
          alt={''}
          className="img-container"
          src={imageSrc}
          ref={this.getRef('imgRef')}
          onLoad={this.onImgLoad}
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