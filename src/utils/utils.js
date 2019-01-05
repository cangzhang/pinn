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

      requestIdleCallback(() => {
        ctx.drawImage(
          this,
          0, realSy, this.width, realDh,
          0, 0, this.width, realDh,
        )
        const data = canvas.toDataURL()
        resolve(data)
      })

      img.onerror = function () {
        reject('Error: Unable to load image.')
      }

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
  const canvas = document.createElement('canvas')
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
  link.download = `${new Date()}.png`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

