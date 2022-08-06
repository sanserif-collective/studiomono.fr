import { gsap, ScrollTrigger } from 'gsap/all'
import { app } from 'scripts/app'

const mapper = gsap.utils.mapRange(-10, 10, -15, 15)

export default class SkewWrapper extends HTMLElement {
  private trigger: ScrollTrigger

  private skewXSet = gsap.quickSetter(this, 'skewX', 'deg')
  private skewX = () => this.skewXSet(mapper(app.globals.scrollVelocity))

  private skewYSet = gsap.quickSetter(this, 'skewY', 'deg')
  private skewY = () => this.skewYSet(mapper(app.globals.scrollVelocity))

  constructor() {
    super()

    ScrollTrigger.matchMedia({
      'all': () => this.trigger?.kill(),
      '(orientation: landscape)': () => {
        this.skewYSet(0)
        gsap.ticker.remove(this.skewY)

        this.trigger = ScrollTrigger.create({
          trigger: this,
          onToggle: ({ isActive }) => {
            if (isActive) return gsap.ticker.add(this.skewX)

            this.skewXSet(0)
            gsap.ticker.remove(this.skewX)
          }
        })
      },
      '(orientation: portrait)': () => {
        this.skewXSet(0)
        gsap.ticker.remove(this.skewX)

        this.trigger = ScrollTrigger.create({
          trigger: this,
          horizontal: false,
          onToggle: ({ isActive }) => {
            if (isActive) return gsap.ticker.add(this.skewY)

            this.skewYSet(0)
            gsap.ticker.remove(this.skewY)
          }
        })
      }
    })
  }

  public disconnectedCallback() {
    this.trigger?.kill()
    gsap.ticker.remove(this.skewX)
    gsap.ticker.remove(this.skewY)
  }
}
