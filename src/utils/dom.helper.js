export const removeChildren = (node, type) => {
  let last = node.querySelector(type)
  while (last) {
    node.removeChild(last)
    last = node.querySelector(type)
  }
}
