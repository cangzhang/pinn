/* eslint-disable no-restricted-globals */

export default () => {
  const OpName = `///OperationName///`

  function drawImageWithSideEffect() {
    let canvas

    return function (rest) {
      const { realSy, naturalWidth, naturalHeight, realDh, image } = rest
      if (!canvas) {
        canvas = rest.canvas
      }

      const ctx = canvas.getContext('2d')
      canvas.width = naturalWidth
      canvas.height = realDh || naturalHeight

      ctx.drawImage(
        image,
        0, realSy, naturalWidth, realDh,
        0, 0, naturalWidth, realDh,
      )

      return {
        imageDate: 'cropImage'
      }
    }
  }
  
  self.addEventListener('message', ev => {
    if (!ev) return

    const drawImage = drawImageWithSideEffect()
    const { [OpName]: operation, ...rest } = ev

    let data
    switch (operation) {
      case 'CropImage': {
        data = drawImage(rest)
        break
      }
      default:
        break
    }

    postMessage(data)
  })
}
