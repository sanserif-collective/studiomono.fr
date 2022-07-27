import type { App } from 'scripts/app/types'

export const app: App.Core = {
  use: (plugin) => plugin.install(app),
  plugins: {},
  globals: {}
}

const start = (
  app: App.Core,
  resolve: (value: PromiseLike<App.Core> | App.Core) => void
) => resolve(app)

export default () => {
  app.loaded = new Promise<App.Core>(resolve => {
    document.addEventListener(
      'DOMContentLoaded',
      () => start(app, resolve)
    )
  })

  return app
}