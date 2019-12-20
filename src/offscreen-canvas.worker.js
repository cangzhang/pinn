/* eslint-disable no-restricted-globals */
export default () => {
  self.addEventListener('message', ev => {
    if (!ev) return

    const { canvas, realSy, naturalWidth, naturalHeight, realDh, image } = ev.data
    const ctx = canvas.getContext('2d')

    canvas.width = naturalWidth
    canvas.height = realDh || naturalHeight

    ctx.drawImage(
      image,
      0, realSy, naturalWidth, realDh,
      0, 0, naturalWidth, realDh,
    )

    postMessage({
      imageData: 0,
    })
  })
}
