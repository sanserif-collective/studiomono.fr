import { gsap } from 'gsap/all'

export default class Marquee extends HTMLElement {
  private direction = this.getAttribute('direction')
  private pauseOnHover = this.getAttribute('pauseonhover')

  private slide = gsap.to(this.children, {
    xPercent: this.direction,
    repeat: -1,
    duration: 5,
    ease: 'none',
    paused: true
  })

  private onMouseEnter = () =>  this.slide.pause()
  private onMouseLeave = () => this.slide.play()

  public play = () => this.slide.play()
  public pause = () => this.slide.pause()

  public connectedCallback() {
    if (this.pauseOnHover) {
      this.addEventListener('mouseenter', this.onMouseEnter)
      this.addEventListener('mouseleave', this.onMouseLeave)
    }
  }
}
