import { app } from 'scripts/app'
import type { App } from 'scripts/app/types'

const addHoverAttribute = () => document.body.setAttribute('data-is-hover', '')
const removeHoverAttribute = () => document.body.removeAttribute('data-is-hover')

const bindClickablesHover = () => {
  const clickables = document.querySelectorAll('a, button, [role="button"]')

  clickables.forEach(clickable => {
    clickable.addEventListener('pointerenter', addHoverAttribute)
    clickable.addEventListener('pointerleave', removeHoverAttribute)
  })

  app.globals.clickables = clickables
}

const unbindClickablesHover = () => {
  app.globals.clickables?.forEach(clickable => {
    clickable.addEventListener('pointerenter', addHoverAttribute)
    clickable.addEventListener('pointerleave', removeHoverAttribute)
  })
}

export const clickables: App.Plugin = {
  install() {
    bindClickablesHover()

    app.plugins.barba?.hooks.before(() => unbindClickablesHover())
    app.plugins.barba?.hooks.beforeEnter(() => removeHoverAttribute())
    app.plugins.barba?.hooks.after(() => bindClickablesHover())
  }
}
