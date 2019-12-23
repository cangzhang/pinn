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
