import { default as core } from '@barba/core'
import type { App } from 'scripts/app/types'
import { getColorAttribute, setColor } from 'scripts/features/color'
import { Transition } from './Transition'

export const barba: App.Plugin = {
  install(app) {
    core.init({
      transitions: [Transition],
      views: [
        {
          namespace: 'base',
          afterEnter() {
            setColor(app, ['#C9C9C9', '#151515', '#fff'])
          }
        },
        {
          namespace: 'project',
          afterEnter({ next }) {
            const color = getColorAttribute(next.container)
            setColor(app, [color, color, color])
          }
        }
      ]
    })

    app.plugins.barba = core
  }
}
