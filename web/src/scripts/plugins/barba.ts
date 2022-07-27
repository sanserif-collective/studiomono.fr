import Barba from '@barba/core'
import type { App } from 'scripts/app/types'

const barba: App.Plugin = {
  install(app) {
    Barba.init()
    app.plugins.barba = Barba
  }
}

export default barba
