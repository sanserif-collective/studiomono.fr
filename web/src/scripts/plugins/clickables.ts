import { gsap } from 'gsap/all'
import type { App } from 'scripts/app/types'

const cursorScale = document.querySelector('[data-cursor-scale]')
const scaleXTo = gsap.quickTo(cursorScale, 'scaleX')
const scaleYTo = gsap.quickTo(cursorScale, 'scaleY')

const onMouseEnter = () => {
  scaleXTo(3)
  scaleYTo(3)
}

const onMouseLeave = () => {
  scaleXTo(1)
  scaleYTo(1)
}

export const clickables: App.Plugin = {
  install(app) {
    app.plugins.barba.hooks.afterEnter(() => {
      app.globals.clickables = document.querySelectorAll('a, button')
      app.globals.clickables.forEach(clickable => {
        clickable.addEventListener('pointerenter', onMouseEnter)
        clickable.addEventListener('pointerleave', onMouseLeave)
      })
    })

    app.plugins.barba.hooks.before(() => {
      app.globals.clickables.forEach(clickable => {
        clickable.removeEventListener('pointerenter', onMouseEnter)
        clickable.removeEventListener('pointerleave', onMouseLeave)
      })
    })

    app.plugins.barba.hooks.before(() => onMouseLeave())
  }
}
