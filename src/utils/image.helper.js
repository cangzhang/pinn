export const drawImageByBlock = data => {
  const tasks = data.map(i => window.createImageBitmap(i.imgRef))

  return Promise.all(tasks)
    .then(bitmaps => {
      const imgData = data.map(i => {
        const {
          imgRef: img,
          topPos: sy,
          selectH: sh,
          offsetHeight: containerHeight,
        } = i;

        const realSy = (img.naturalHeight / containerHeight) * sy
        const realSh = (img.naturalHeight / containerHeight) * sh

        return {
          realSy: parseInt(realSy, 10),
          realSh: parseInt(realSh, 10),
        }
      })

      return [bitmaps, imgData]
    })
}
