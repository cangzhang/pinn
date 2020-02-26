export const drawOneImage = async ({ data, canvas, bitmaps }) => {
  const ctx = canvas.getContext(`2d`)
  const dw = canvas.width;

  data.reduce((dy, imgData, idx) => {
    const bitmap = bitmaps[idx]
    const sw = bitmap.width

    const { realSy, realSh, } = imgData
    const sy = parseInt(realSy, 10)
    const sh = parseInt(realSh, 10)
    const vh = realSh / sw * dw

    ctx.drawImage(
      bitmap,
      0, sy, sw, sh,
      0, dy, dw, vh,
    )

    return dy + vh
  }, 0)
}
