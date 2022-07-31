import Barba from '@barba/core'
import { gsap, ScrollTrigger } from 'gsap/all'
import type { App } from 'scripts/app/types'

const barba: App.Plugin = {
  shutter: document.querySelector('[data-loading-shutter]'),
  translater: document.querySelector('[data-loading-translater]'),
  transition: null,
  install(app) {
    Barba.init({
      transitions: [{
        leave: () => {
          if (app.refs.menu.hasAttribute('open')) return

          this.transition = gsap.timeline()
            .to(this.shutter, {
              scaleX: 1,
              transformOrigin: 'left',
              ease: 'power3.in',
              duration: 1,
            })
            .to(this.translater, {
              x: window.innerWidth / 2,
              ease: 'power3.in',
              duration: 1,
            }, 0)
        },
        enter: async () => {
          if (app.refs.menu.hasAttribute('open')) return

          await this.transition.then()

          this.transition = gsap.timeline()
            .fromTo(this.translater, {
              x: -window.innerWidth / 2,
            }, {
              x: 0,
              duration: 1,
              ease: 'power3.out'
            })
            .to(this.shutter, {
              scaleX: 0,
              transformOrigin: 'right',
              ease: 'power3.out',
              duration: 1
            }, 0)
            .add(() => ScrollTrigger.refresh(true), 0.5)
        }
      }]
    })

    app.plugins.barba = Barba
  }
}

export default barba
