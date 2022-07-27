import { gsap } from 'gsap/all'

export default class ParallaxWrapper extends HTMLElement {
  public connectedCallback() {
    gsap.from(this, {
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
}
