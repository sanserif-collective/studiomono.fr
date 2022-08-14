import { gsap } from 'gsap/all'

export class Marquee extends HTMLElement {
  private delayedPlay: gsap.core.Tween
  private delayedPause: gsap.core.Tween

  private playing = this.getAttribute('playing') ?? 'lazy'
  private direction = this.getAttribute('direction') ?? '100'
  private pauseOnHover = this.hasAttribute('pauseonhover')
  private playOnHover = this.hasAttribute('playonhover')
  private delayBeforePlay = Number(this.getAttribute('delaybeforeplay') ?? '0')
  private delayBeforePause = Number(this.getAttribute('delaybeforepause') ?? '0')

  private slide = gsap.to(this.children, {
    xPercent: this.direction,
    repeat: -1,
    duration: 5,
    ease: 'none',
    paused: this.playing === 'lazy'
  })

  private onMouseEnter = () => {
    this.pauseOnHover && this.pause()
    this.playOnHover && this.play()
  }

  private onMouseLeave = () => {
    this.pauseOnHover && this.play()
    this.playOnHover && this.pause()
  }

  public play = () => {
    this.delayedPause?.kill()

    if (this.delayBeforePlay) {
      return this.delayedPlay = gsap.delayedCall(
        this.delayBeforePlay,
        () => this.slide.play()
      )
    }

    this.slide.play()
  }

  public pause = () => {
    this.delayedPlay?.kill()

    if (this.delayBeforePause) {
      return this.delayedPause = gsap.delayedCall(
        this.delayBeforePause,
        () => this.slide.pause()
      )
    }

    this.slide.pause()
  }

  public connectedCallback() {
    this.addEventListener('mouseenter', this.onMouseEnter)
    this.addEventListener('mouseleave', this.onMouseLeave)
  }
}
