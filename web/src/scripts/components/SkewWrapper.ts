import { gsap, ScrollTrigger } from 'gsap/all'
import { app } from 'scripts/app'

const mapper = gsap.utils.mapRange(-10, 10, -20, 20)

export default class SkewWrapper extends HTMLElement {
  private skewXSet = gsap.quickSetter(this, 'skewX', 'deg')
  private skew = () => this.skewXSet(mapper(app.globals.scrollVelocity))

  private trigger = ScrollTrigger.create({
    trigger: this,
    onToggle: ({ isActive }) => {
      if (isActive) return gsap.ticker.add(this.skew)

      this.skewXSet(0)
      gsap.ticker.remove(this.skew)
    }
  })

  public disconnectedCallback() {
    this.trigger.kill()
    gsap.ticker.remove(this.skew)
  }
}
