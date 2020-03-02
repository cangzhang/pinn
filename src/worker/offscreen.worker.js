export const drawOffscreenCanvas = async ({ data, bitmaps, dw = 300, offscreen }) => {
  const [vhs, oHeight] = data.reduce(([vhs, oHeight], imgData, idx) => {
    const bitmap = bitmaps[idx]
    const sw = bitmap.width
    const { realSh: sh, } = imgData
    const vh = sh / sw * dw
    vhs = vhs.concat(vh)
    oHeight += (vh + 5)
    return [vhs, oHeight]
  }, [[], 0])

  offscreen.width = dw
  offscreen.height = oHeight

  const ctx = offscreen.getContext(`2d`)

  data.reduce((dy, imgData, idx) => {
    const bitmap = bitmaps[idx]
    const vh = vhs[idx]
    const sw = bitmap.width

    const { realSy: sy, realSh: sh, } = imgData

    ctx.drawImage(
      bitmap,
      0, sy, sw, sh,
      0, dy, dw, vh,
    )

    return dy + vh + 5
  }, 0)
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
