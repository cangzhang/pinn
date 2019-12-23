/* eslint-disable no-restricted-globals */

import { MIN_GAP } from 'src/utils/constants'
import { bunchDrawOffscreenImage } from 'src/utils/offscreen.helper'

self.addEventListener('message', ev => {
  if (!ev) return

  bunchDrawOffscreenImage(ev.data)
  postMessage(MIN_GAP)
})
