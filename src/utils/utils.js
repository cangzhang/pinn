export const cropImage = (src, sy, sh, containerHeight) => {
  let canvas
  const img = new Image()

  return new Promise((resolve, reject) => {
    if (!canvas)
      canvas = document.createElement('canvas')

    const ctx = canvas.getContext('2d')

    img.onload = function () {
      const realSy = (this.height / containerHeight) * sy
      const realDh = (this.height / containerHeight) * sh

      canvas.width = this.width
      canvas.height = realDh || this.height

      ctx.drawImage(
        this,
        0, realSy, this.width, realDh,
        0, 0, this.width, realDh,
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

const loadImgFromUrl = (url, shouldInitSize, canvas, data) => {
  const img = new Image()

  return new Promise((resolve, reject) => {
    img.onload = function () {
      let oldH = canvas.height
      if (shouldInitSize) {
        oldH = this.height
        canvas.width = this.width
        canvas.height = this.height
      } else {
        canvas.height = oldH + this.height
      }

      // const ctx = canvas.getContext('2d')
      // ctx.drawImage(
      //   this,
      //   0, 0, this.width, this.height,
      //   0, oldH, canvas.width, this.height,
      // )

      const obj = {
        src: this,
        sx: 0, sy: 0, sw: this.width, sh: this.height,
        dx: 0, dy: oldH, dw: canvas.width, dh: this.height,
      }

      img.onerror = function () {
        reject('Error: Unable to load image.')
      }
      resolve([canvas, data.concat(obj)])
    }

    img.src = url
  })
}

export const mergeImages = srcUrls => {
  // const canvas = document.querySelector('canvas#canvas')
  const canvas = document.createElement('canvas')
  const result = []

  return srcUrls
    .reduce(
      (promise, url, idx) => promise.then(([c, data]) => loadImgFromUrl(url, !idx, c, data)),
      Promise.resolve([canvas, result])
    )
    .then(([, res]) => {
      const ctx = canvas.getContext('2d')
      res.map(obj => {
        const { src, sx, sy, sw, sh, dx, dy, dw, dh } = obj
        ctx.drawImage(
          src,
          sx, sy, sw, sh,
          dx, dy, dw, dh,
        )
      })
      const d = canvas.toDataURL()
      return d;
    })
}
