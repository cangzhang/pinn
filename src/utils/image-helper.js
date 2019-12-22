export const preparePreview = (data) => {
  if (!data.length)
    return Promise.reject(false)

  // init canvas
  const canvas = document.createElement('canvas')
  const { width, height } = data.reduce((res, { imgRef }) => {
    return {
      height: res.height + imgRef.naturalHeight,
      width: Math.max(res.width, imgRef.naturalWidth)
    }
  }, { width: 0, height: 0 })
  canvas.width = width
  canvas.height = height

  document.querySelector('#finalPreview').replaceChild(
    canvas,
    document.querySelector('#finalPreview > canvas')
  )

  const createImages = data.map(i => window.createImageBitmap(i.imgRef))
  const offscreenCanvas = canvas.transferControlToOffscreen()

  return Promise.all(createImages)
    .then(images => {
      return {
        images,
        canvas: offscreenCanvas,
        imageData: data.map((item) => {
          const {
            imgRef: img,
            topPos: sy,
            selectH: sh,
            offsetHeight: containerHeight,
          } = item

          const realSy = (img.naturalHeight / containerHeight) * sy
          const realDh = (img.naturalHeight / containerHeight) * sh

          return {
            realSy,
            realDh,
            naturalHeight: img.naturalHeight,
            naturalWidth: img.naturalWidth
          }
        }),
      }
    })
}

export const bunchDrawOffscreenImage = ({ images, canvas, imageData }) => {
  const ctx = canvas.getContext(`2d`)

  images.forEach((i, idx) => {
    const { realSy, realDh, naturalWidth } = imageData[idx]
    const dy = imageData[idx - 1] && parseInt(imageData[idx - 1].naturalHeight, 10)

    console.log(realSy, naturalWidth, realDh, dy)

    ctx.drawImage(
      i,
      0, realSy, naturalWidth, realDh,
      0, dy || 0, naturalWidth, realDh,
    )
  })
}

const loadImgFromUrl = (url, shouldInitSize, canvas, data) => {
  const img = new Image()

  return new Promise((resolve, reject) => {
    img.onload = function () {
      let oldH = canvas.height
      if (shouldInitSize) {
        canvas.width = this.width
        canvas.height = this.height
        oldH = 0
      } else {
        canvas.height = oldH + this.height
      }

      const obj = {
        src: this,
        sx: 0, sy: 0, sw: this.width, sh: this.height,
        dx: 0, dy: oldH, dw: canvas.width, dh: this.height,
      }
      resolve([canvas, data.concat(obj)])
    }

    img.onerror = function () {
      reject('Error: Unable to load image.')
    }

    img.src = url
  })
}

export const mergeImages = srcUrls => {
  const canvas = document.createElement('canvas').transferControlToOffscreen()
  const result = []

  return srcUrls
    .reduce(
      (promise, url, idx) => promise.then(([c, data]) => loadImgFromUrl(url, !idx, c, data)),
      Promise.resolve([canvas, result])
    )
    .then(([c, res]) => {
      const ctx = c.getContext('2d')
      res.forEach(obj => {
        const { src, sx, sy, sw, sh, dx, dy, dw, dh } = obj
        ctx.drawImage(
          src,
          sx, sy, sw, sh,
          dx, dy, dw, dh,
        )
      })
      const d = c.toDataURL()
      return d;
    })
}

export const downloadImage = dataUrl => {
  const link = document.createElement('a')
  link.href = dataUrl
  link.style = `display: none`;
  link.download = `${Date.now()}.png`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

