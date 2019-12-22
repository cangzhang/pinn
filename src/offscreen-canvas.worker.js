/* eslint-disable no-restricted-globals */

import { MIN_GAP } from './utils/constants'
import { bunchDrawOffscreenImage } from './utils/image-helper'

self.addEventListener('message', ev => {
  if (!ev) return

  bunchDrawOffscreenImage(ev.data)
  postMessage(MIN_GAP)
})
