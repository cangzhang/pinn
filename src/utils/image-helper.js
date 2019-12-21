export const cropImage = () => {
  return async (img, sy, sh, containerHeight, idx = 0) => {
    try {
      const previewCanvas = document.querySelector('#finalPreview > canvas');

      const nCanvas = document.createElement('canvas')
      nCanvas.id = `img-${idx + 1}`
      const offscreenCanvas = nCanvas.transferControlToOffscreen()

      const realSy = (img.naturalHeight / containerHeight) * sy
      const realDh = (img.naturalHeight / containerHeight) * sh

      const image = await window.createImageBitmap(img)

      // previewCanvas.parentNode.replaceChild(nCanvas, previewCanvas)
      previewCanvas.parentNode.appendChild(nCanvas)

      return {
        image,
        canvas: offscreenCanvas,
        realSy,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
        realDh,
      }
    } catch (e) {
      return e
    }
  }
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

