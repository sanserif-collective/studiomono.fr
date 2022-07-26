import type { App } from 'scripts/app/types'
import SplitType from 'split-type'

const splitElements = () => {
  const toSplit = document.querySelectorAll<HTMLElement>('[data-split]')
  toSplit.forEach(toSplit => new SplitType(toSplit))
}

const splitType: App.Plugin = {
  install: () => splitElements()
}

export default splitType
