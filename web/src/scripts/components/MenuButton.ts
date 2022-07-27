import { gsap, ScrollTrigger } from 'gsap/all'
import { app } from 'scripts/app'
import type NavigationMenu from 'scripts/components/NavigationMenu'

const menu = document.querySelector<NavigationMenu>('navigation-menu')

export default class MenuButton extends HTMLElement {
  private open() {
    this.setAttribute('open', '')
    menu.open()
  }

  private close() {
    this.removeAttribute('open')
    menu.close()
  }

  private onClick = () => this.hasAttribute('open') ? this.close() : this.open()

  public connectedCallback() {
    ScrollTrigger.matchMedia({
      '(orientation: landscape)': () => {
        const offset = gsap.to(this, {
          x: -document.querySelector<HTMLElement>('[data-footer]').offsetWidth,
          paused: true
        })

        ScrollTrigger.create({
          trigger: document.querySelector('[data-footer]'),
          animation: offset,
          scrub: 1,
          start: 'left right',
          end: 'right right'
        })
      }
    })

    this.addEventListener('click', this.onClick)
    app.plugins.barba.hooks.before(() => this.close())
  }
}
