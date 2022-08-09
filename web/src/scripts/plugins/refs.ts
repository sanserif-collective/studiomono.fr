import type { App } from 'scripts/app/types'

export const refs: App.Plugin = {
  install(app) {
    app.refs.menu = document.querySelector('sanserif-menu')
    app.refs.footer = document.querySelector('[data-footer]')

    app.plugins.barba.hooks.afterEnter(({ next }) => {
      app.refs.footer = next.container.querySelector('[data-footer]')
    })
  }
}
