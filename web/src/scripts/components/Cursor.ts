import { gsap } from 'gsap/all'

export class Cursor extends HTMLElement {
  private duration = Number(this.getAttribute('duration')) ?? 0.5
  private position = { x: 0, y: 0 }

  private xTo = gsap.quickTo(this, 'x', { duration: this.duration })
  private yTo = gsap.quickTo(this, 'y', { duration: this.duration })

  private updatePosition = ({ x, y }: MouseEvent) => {
    this.position.x = x
    this.position.y = y
  }

  private moveCursor = () => {
    this.xTo(this.position.x - (this.offsetWidth / 2))
    this.yTo(this.position.y - (this.offsetHeight / 2))
  }

  public connectedCallback() {
    window.addEventListener('mousemove', this.updatePosition)
    gsap.ticker.add(this.moveCursor)
  }

  public disconnectedCallback() {
    window.removeEventListener('mousemove', this.updatePosition)
    gsap.ticker.remove(this.moveCursor)
  }
}
