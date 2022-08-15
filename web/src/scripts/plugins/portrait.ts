import type { App } from 'scripts/app/types'

export type ChangeEvent = (
  event: MediaQueryListEvent | MediaQueryList
) => void

export type Plugin = {
  media: MediaQueryList
  events: Set<ChangeEvent>
}

const portrait: App.Plugin = {
  install(app) {
    const media = window.matchMedia('(orientation: portrait)')
    const events = new Set<ChangeEvent>()

    media.addEventListener('change', event => {
      events.forEach(callback => callback(event))
    })

    app.plugins.portrait = { media, events }
  }
}

export default portrait
