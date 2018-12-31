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
