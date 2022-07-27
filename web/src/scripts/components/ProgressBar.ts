import { gsap } from 'gsap/all'
import { app } from 'scripts/app'

export default class ProgressBar extends HTMLElement {
  private scaleXTo = gsap.quickTo(this, 'scaleX')

  public connectedCallback() {
    const { scroll, barba } = app.plugins
    scroll.on('scroll', (currentPos: number) => this.scaleXTo(currentPos / scroll.maxScroll))
    barba.hooks.before(() => this.scaleXTo(0))
  }
}
