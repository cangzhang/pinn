import './image-handler.css'

import React from 'react'
import { IMAGE_WIDTH, MIN_GAP } from '../utils/constants'

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

  componentDidMount() {
    this.worker = new Worker('../offscreen-canvas.worker.js', {
      name: 'offscreen-canvas',
      type: 'module',
    })

    this.worker.onmessage = ev => {
      console.log('cropImage: ', ev.data)
    }
  }

  generateCropped = () => {
    const { offsetHeight } = this.containerRef
    const { topPos, botPos } = this.state
    const selectH = offsetHeight - topPos - botPos

    // todo: deal images together 
    this.props.onCropImage(this.imgRef, topPos, selectH, offsetHeight, this.props.imageIdx)
      .then(data => {
        const params = (data.prev && [data.canvas, data.prev]) || [data.canvas]
        this.worker.postMessage(data, params)
      })
    // this.props.onUpdateCrop(data)
  }

  onImgLoad = () => {
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
      // cb && cb()
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

    this.updateState(pos, isTopOne, this.generateCropped)
  }

  getRef = refName => el => {
    this[refName] = el
  }

  toggleLock = () => {
    const { locked } = this.state
    this.setState({
      locked: !locked
    })
  }

  render() {
    const { imageSrc } = this.props
    const { topPos, botPos, containerHeight, locked } = this.state

    return (
      <div
        className='image-handler-container'
        style={{
          position: 'relative',
          width: `${IMAGE_WIDTH}px`,
          height: containerHeight
        }}
        ref={this.getRef('containerRef')}
      >
        <div className='ctl-group'>
          <span className='icon remove-img'>
            <i
              className='ion ion-md-close'
              onClick={this.props.onRemoveImage}
            />
          </span>
          <span className='icon lock-img'>
            <i
              className={`ion ${locked ? 'ion-md-lock' : 'ion-md-unlock'}`}
              onClick={this.toggleLock}
            />
          </span>
        </div>

        <img
          alt={''}
          draggable={false}
          className='img-container'
          src={imageSrc}
          ref={this.getRef('imgRef')}
          onLoad={this.onImgLoad}
        />

        <div
          className='overlay-indicator'
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
          className='overlay-indicator'
          style={{
            bottom: 0,
            height: `${botPos}px`,
          }}
        />

      </div>
    )
  }
}
