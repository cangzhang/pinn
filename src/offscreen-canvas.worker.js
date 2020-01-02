/* eslint-disable no-restricted-globals */
import { bunchDrawOffscreenImage, drawOneImage } from 'src/utils/offscreen.helper'

self.addEventListener('message', ev => {
  if (!ev) return

  // bunchDrawOffscreenImage(ev.data)
  drawOneImage(ev.data)
  // postMessage(MIN_GAP)
})
