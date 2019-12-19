/* eslint-disable no-restricted-globals */

export default () => {
  self.addEventListener('message', ev => {
    if (!ev)
      return

    const { data } = ev
    // self.createImageBitmap(data[0])
    postMessage(data)
  })
}
