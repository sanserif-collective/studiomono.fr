import { gsap, ScrollTrigger } from 'gsap/all'
import { app } from 'scripts/app'

const mapper = gsap.utils.mapRange(-10, 10, -20, 20)

export default class SkewWrapper extends HTMLElement {
  private skewXSet = gsap.quickTo(this, 'skewX')
  private skew = () => this.skewXSet(mapper(app.globals.scrollVelocity))

  public connectedCallback() {
    ScrollTrigger.create({
      trigger: this,
      onEnter: () => gsap.ticker.add(this.skew),
      onEnterBack: () => gsap.ticker.add(this.skew),
      onLeave: () => gsap.ticker.remove(this.skew),
      onLeaveBack: () => gsap.ticker.remove(this.skew)
    })
  }
}
