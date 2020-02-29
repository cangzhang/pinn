import s from './image-handler.module.scss'

import React from 'react'
import cn from 'classnames'

import { IMAGE_WIDTH, MIN_GAP } from 'src/utils/constants'

export default class ImageHandler extends React.Component {
  topRef = null
  botRef = null
  containerRef = null
  imgRef = null

  state = {
    topPos: this.props.topPos || 100,
    botPos: this.props.botPos || 20,
    containerHeight: 'unset',
    locked: !!this.props.forceLocked,
  }

  generateCropped = (always = false) => {
    const { offsetHeight } = this.containerRef
    const { topPos, botPos } = this.state
    const selectH = offsetHeight - topPos - botPos

    this.props.onCollectImageData(this.imgRef, topPos, selectH, offsetHeight, this.props.imageIdx, always)
  }

  onImgLoad = () => {
    this.props.onImageLoad(this.imgRef)

    const { naturalHeight, naturalWidth } = this.imgRef
    const height = (naturalHeight / naturalWidth) * IMAGE_WIDTH

    const shouldUpdatePos = !this.props.topPos
    const nState = {
      containerHeight: `${height}px`,
    }

    if (shouldUpdatePos) {
      const { botPos } = this.state
      nState.topPos = height - botPos - 100
    }

    this.setState({ ...nState }, () => {
      this.generateCropped()
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

    this.updateState(pos, isTopOne, () => this.generateCropped(true))
  }

  getRef = refName => el => {
    this[refName] = el
  }

  render() {
    const { imageSrc } = this.props
    const { topPos, botPos, containerHeight, } = this.state

    return (
      <div
        className={s.imageHandlerContainer}
        style={{
          width: `${IMAGE_WIDTH}px`,
          height: containerHeight
        }}
        ref={this.getRef('containerRef')}
      >
        <div className={s.ctlGroup}>
          <span className={cn(`icon`, s.removeImg)}>
            <i
              className='ion ion-md-close'
              onClick={this.props.onRemoveImage}
            />
          </span>
          {/*
          <span className='icon lock-img'>
            <i
              className={`ion ${locked ? 'ion-md-lock' : 'ion-md-unlock'}`}
              onClick={this.toggleLock}
            />
          </span>
*/}
        </div>

        <img
          className={s.imgContainer}
          alt={''}
          draggable={false}
          src={imageSrc}
          ref={this.getRef('imgRef')}
          onLoad={this.onImgLoad}
        />

        <div
          className={s.overlayIndicator}
          style={{
            top: 0,
            height: `${topPos}px`,
          }}
        />

        <div
          className={cn(s.selectHandler, s.top)}
          style={{
            top: `${topPos}px`
          }}
          ref={this.getRef('topRef')}
          draggable={true}
          onDrag={this.handleDragStart()}
          onDragEnd={this.handleDrop()}
        />

        <div
          className={cn(s.selectHandler, s.bottom)}
          style={{
            bottom: `${botPos}px`
          }}
          ref={this.getRef('botRef')}
          draggable={true}
          onDrag={this.handleDragStart(false)}
          onDragEnd={this.handleDrop(false)}
        />

        <div
          className={s.overlayIndicator}
          style={{
            bottom: 0,
            height: `${botPos}px`,
          }}
        />

      </div>
    )
  }
}
