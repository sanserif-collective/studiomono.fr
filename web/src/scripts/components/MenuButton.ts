import { gsap, ScrollTrigger } from 'gsap/all'
import { app } from 'scripts/app'

export default class MenuButton extends HTMLElement {
  private open() {
    this.setAttribute('open', '')
    app.refs.menu.open()
  }

  private close() {
    this.removeAttribute('open')
    app.refs.menu.close()
  }

  private onClick = () => this.hasAttribute('open') ? this.close() : this.open()

  public connectedCallback() {
    ScrollTrigger.matchMedia({
      '(orientation: landscape)': () => {
        gsap.to(this, {
          x: -document.querySelector<HTMLElement>('[data-footer]').offsetWidth,
          paused: true,
          scrollTrigger: {
            trigger: document.querySelector('[data-footer]'),
            scrub: 1,
            start: 'left right',
            end: 'right right'
          }
        })
      }
    })

    this.addEventListener('click', this.onClick)
    app.plugins.barba.hooks.before(() => this.close())
  }
}
