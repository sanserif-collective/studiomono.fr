import { gsap } from 'gsap/all'

export class Marquee extends HTMLElement {
  private playing = this.getAttribute('playing') ?? 'lazy'
  private direction = this.getAttribute('direction')
  private pauseOnHover = this.getAttribute('pauseonhover')

  private slide = gsap.to(this.children, {
    xPercent: this.direction,
    repeat: -1,
    duration: 5,
    ease: 'none',
    paused: this.playing === 'lazy'
  })

  private onMouseEnter = () => this.pauseOnHover && this.slide.pause()
  private onMouseLeave = () => this.pauseOnHover && this.slide.play()

  public play = () => this.slide.play()
  public pause = () => this.slide.pause()

  public connectedCallback() {
    this.addEventListener('mouseenter', this.onMouseEnter)
    this.addEventListener('mouseleave', this.onMouseLeave)
  }
}
