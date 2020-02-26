export const drawOneImage = async ({ data, canvas, bitmaps }) => {
  const ctx = canvas.getContext(`2d`)

  data.forEach((imgData, idx) => {
    const bitmap = bitmaps[idx]
    const { realSy, realDh, naturalWidth } = imgData
    const dy = imgData && parseInt(imgData.naturalHeight, 10)

    ctx.drawImage(
      bitmap,
      0, parseInt(realSy, 10), naturalWidth, parseInt(realDh, 10),
      0, dy || 0, naturalWidth, parseInt(realDh, 10),
    )
  })
}
