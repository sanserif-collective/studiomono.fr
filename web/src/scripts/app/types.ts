import type ASScroll from '@ashthornton/asscroll'
import type barba from '@barba/core'
import type { Menu } from 'scripts/components/Menu'
import type { Plugin as Portrait } from 'scripts/plugins/portrait'

export namespace App {
  export type Core = {
    loaded?: Promise<Core>
    plugins: Plugins
    globals: Globals
    refs: Refs
    use: (plugin: Plugin) => void
  }

  export type Plugin = {
    install: (app: Core) => void
    [props: string]: unknown
  }

  export type Plugins = {
    scroll?: ASScroll
    portrait?: Portrait
    barba?: typeof barba
  }

  export type Globals = {
    scrollVelocity?: number
    cursorColor?: string
    cursorColorHover?: string
    clickables?: NodeList
  }

  export type Refs = {
    menu?: Menu
    footer?: HTMLElement
  }
}
