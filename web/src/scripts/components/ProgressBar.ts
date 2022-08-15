import { gsap } from 'gsap/all'
import { app } from 'scripts/app'

export class ProgressBar extends HTMLElement {
  private scaleXTo = gsap.quickTo(this, 'scaleX')

  private setProgress = (currentPos: number) => this.scaleXTo(
    currentPos / (app.plugins.scroll?.maxScroll ?? 0)
  )

  public connectedCallback() {
    app.plugins.scroll?.on('scroll', this.setProgress)
    app.plugins.barba?.hooks.before(() => this.scaleXTo(0))
  }
}
