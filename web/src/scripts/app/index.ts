import type { App } from 'scripts/app/types'

const use = (plugin: App.Plugin) => {
  app.installed = [
    ...app.installed,
    new Promise(async resolve => {
      await app.loaded
      resolve(plugin.install(app))
    })
  ]
}

export const app: App.Core = {
  use,
  hooks: {},
  plugins: {},
  globals: {},
  refs: {},
  installed: []
}

const start = async (
  app: App.Core,
  resolve: (value: PromiseLike<App.Core> | App.Core) => void
) => {
  // Initialize some logic before mounting the app.
  await app.hooks.before?.(app)

  // Mount the app.
  resolve(app)

  // Wait all plugins to be installed.
  await Promise.all(app.installed)

  // Initialize some logic after mounting the app.
  app.hooks.after?.(app)
}

export const createApp = (hooks: App.Hooks = {}) => {
  app.hooks = hooks
  app.loaded = new Promise<App.Core>(resolve => {
    document.addEventListener(
      'DOMContentLoaded',
      () => start(app, resolve)
    )
  })

  return app
}
