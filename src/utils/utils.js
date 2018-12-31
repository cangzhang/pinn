export const cropImage = (src, sy, sh, containerHeight) => {
  let canvas
  const img = new Image()

  return new Promise((resolve, reject) => {
    if (!canvas)
      canvas = document.createElement('canvas')

    const ctx = canvas.getContext('2d')

    img.onload = function () {
      const scaledH = (this.height / containerHeight) * sh
      const scaledSy = (this.height / containerHeight) * sy

      canvas.width = this.width
      canvas.height = this.height
      ctx.drawImage(
        this,
        0, scaledSy, this.width, scaledH,
        0, 0, this.width, scaledH,
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
