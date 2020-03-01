export const drawOffscreenCanvas = async ({ data, bitmaps }) => {
  const dw = 300;
  const canvas = new OffscreenCanvas(dw, 1000);
  const ctx = canvas.getContext(`2d`)

  data.reduce((dy, imgData, idx) => {
    const bitmap = bitmaps[idx]
    const sw = bitmap.width

    const { realSy: sy, realSh: sh, } = imgData
    const vh = sh / sw * dw

    ctx.drawImage(
      bitmap,
      0, sy, sw, sh,
      0, dy, dw, vh,
    )

    return dy + vh + 5
  }, 0)

  const d = canvas.transferToImageBitmap()
  return d
}

export const downloadImage = async ({ data, bitmaps }) => {
  const w = Math.max(...bitmaps.map(i => i.width))
  const h = data.reduce((result, { realSh }) => realSh + result, 0)
  const canvas = new OffscreenCanvas(w, h)
  const context = canvas.getContext(`2d`)

  data.reduce((dy, imgData, idx) => {
    const bitmap = bitmaps[idx]
    const sw = bitmap.width
    const { realSy: sy, realSh: sh, } = imgData

    context.drawImage(
      bitmap,
      0, sy, sw, sh,
      0, dy, w, sh,
    )

    return dy + sh
  }, 0)

  return await canvas.convertToBlob()
}
