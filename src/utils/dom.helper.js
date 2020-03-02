export const removeAllChildren = node => {
  let last = node.lastChild
  while (last) {
    node.removeChild(last)
    last = node.lastChild
  }
}
