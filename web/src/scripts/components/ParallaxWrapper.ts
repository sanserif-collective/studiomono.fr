import { gsap } from 'gsap/all'

export default class ParallaxWrapper extends HTMLElement {
  private parallax: gsap.core.Tween | null = null

  private init(matches: boolean) {
    this.parallax?.kill()

    if (matches) {
      // gsap.set(this, { clearProps: true })

      return this.parallax = gsap.from(this, {
        yPercent: this.offsetWidth > this.offsetHeight ? 50 : 100,
        duration: 5,
        paused: true,
        scrollTrigger: {
          horizontal: false,
          trigger: this,
          scrub: 0.1,
          start: 'top bottom',
          end: 'bottom top'
        }
      })
    }

    // gsap.set(this, { clearProps: true })

    this.parallax = gsap.from(this, {
      xPercent: this.offsetWidth > this.offsetHeight ? 50 : 100,
      duration: 5,
      paused: true,
      scrollTrigger: {
        trigger: this,
        scrub: 0.1,
        start: 'left right',
        end: 'right left'
      }
    })
  }

  constructor() {
    super()

    // app.plugins.portrait.events.add(({ matches }) => this.init(matches))
    // this.init(app.plugins.portrait.media.matches)
  }

  public disconnectedCallback() {
    this.parallax?.kill()
  }
}
