/* eslint-disable no-restricted-globals */

import { MIN_GAP } from './utils/constants'
import { drawImage } from './utils/image-helper'

self.addEventListener('message', ev => {
  if (!ev) return

  drawImage(ev.data)
  postMessage(MIN_GAP)
})
