import { gsap } from 'gsap/all'

export default class ParallaxWrapper extends HTMLElement {
  private parallax: gsap.core.Tween

  public connectedCallback() {
    this.parallax = gsap.from(this, {
      xPercent: this.offsetWidth > this.offsetHeight ? 50 : 100,
      duration: 5,
      scrollTrigger: {
        trigger: this,
        scrub: 0.1,
        start: 'left right',
        end: 'right left'
      }
    })
  }

  public disconnectedCallback() {
    this.parallax.kill()
  }
}
