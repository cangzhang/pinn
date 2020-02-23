export const bunchDrawOffscreenImage = ({ images, canvas, imageData }) => {
  const ctx = canvas.getContext(`2d`)

  images.forEach((i, idx) => {
    const { realSy, realDh, naturalWidth } = imageData[idx]
    const dy = imageData[idx - 1] && parseInt(imageData[idx - 1].naturalHeight, 10)

    ctx.drawImage(
      i,
      0, parseInt(realSy, 10), naturalWidth, parseInt(realDh, 10),
      0, dy || 0, naturalWidth, parseInt(realDh, 10),
    )
  })
}

export const drawOneImage = async ({ data, canvas }) => {
  const ctx = canvas.getContext(`2d`)

  data.forEach(({ image, imageData }) => {
    const { realSy, realDh, naturalWidth } = imageData
    const dy = imageData && parseInt(imageData.naturalHeight, 10)

    ctx.drawImage(
      image,
      0, parseInt(realSy, 10), naturalWidth, parseInt(realDh, 10),
      0, dy || 0, naturalWidth, parseInt(realDh, 10),
    )
  })
}
