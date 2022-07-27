import type ASScroll from '@ashthornton/asscroll'
import type barba from '@barba/core'
import type { Plugin as Portrait } from 'scripts/plugins/portrait'

export namespace App {
  export type Core = {
    loaded?: Promise<Core>
    plugins: Plugins
    globals: Globals
    use: (plugin: Plugin) => void
  }

  export type Plugin = {
    install: (app: Core) => void
  }

  export type Plugins = {
    scroll?: ASScroll
    portrait?: Portrait
    barba?: typeof barba
  }

  export type Globals = {
    scrollVelocity?: number
  }
}
