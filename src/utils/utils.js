export const cropImage = (img, sy, sh, containerHeight) => {
  let canvas

  return new Promise((resolve, reject) => {
    try {
      if (!canvas)
        canvas = document.createElement('canvas')

      const ctx = canvas.getContext('2d')

      const realSy = (img.naturalHeight / containerHeight) * sy
      const realDh = (img.naturalHeight / containerHeight) * sh

      canvas.width = img.naturalWidth
      canvas.height = realDh || img.naturalHeight

      ctx.drawImage(
        img,
        0, realSy, img.naturalWidth, realDh,
        0, 0, img.naturalWidth, realDh,
      )

      const data = canvas.toDataURL()
      resolve(data)
    } catch(e) {
      reject(e)
    }
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

