import Barba from '@barba/core'
import { gsap, ScrollTrigger } from 'gsap/all'
import type { App } from 'scripts/app/types'
import { Marquee } from 'scripts/components/Marquee'
import { setCursorColor, setCursorColorHover, setProgressBarColor } from 'scripts/utilities/cursor'

const getProjectColor = (container: HTMLElement) => {
  return container
    .querySelector<HTMLElement>('[data-project]')
    .dataset
    .color
}

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

          gsap.timeline({
            onComplete: () => ScrollTrigger.refresh(true),
            delay: 2
          })
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
        },
        once() {
          const loader = document.querySelector('[data-loader]')
          const marquee = loader.querySelector<Marquee>('marquee-carousel')

          gsap.timeline({
            onComplete: () => marquee.pause(),
          })
            .to(loader, {
              yPercent: 100,
              duration: 2,
              ease: 'power4.inOut'
            })
            .to(marquee.children, {
              yPercent: 100,
              ease: 'power3.inOut'
            }, '-=1.45')
        }
      }],
      views: [
        {
          namespace: 'base',
          afterEnter() {
            app.globals.cursorColor = '#151515'
            app.globals.cursorColorHover = '#fff'

            setProgressBarColor('#C9C9C9')
            setCursorColor(app.globals.cursorColor)
            setCursorColorHover(app.globals.cursorColorHover)
          }
        },
        {
          namespace: 'project',
          afterEnter({ next }) {
            const color = getProjectColor(next.container)
            app.globals.cursorColor = color
            app.globals.cursorColorHover = color

            console.log(color)
            setProgressBarColor(color)
            setCursorColor(color)
            setCursorColorHover(color)
          }
        }
      ]
    })

    app.plugins.barba = Barba
  }
}

export default barba
