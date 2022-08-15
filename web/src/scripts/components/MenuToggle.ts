import { gsap } from 'gsap/all'
import { app } from 'scripts/app'

export class MenuToggle extends HTMLElement {
  private shiftTween?: gsap.core.Tween

  private open() {
    this.setAttribute('open', '')
    app.refs.menu?.open()
  }

  private close() {
    this.removeAttribute('open')
    app.refs.menu?.close()
  }

  private onClick = () => {
    if (this.hasAttribute('open')) {
      return this.close()
    }

    this.open()
  }

  private createShiftTween = (
    event: MediaQueryListEvent | MediaQueryList | undefined
  ) => {
    this.shiftTween?.time(0).kill()

    if (!app.refs.footer || event?.matches) return

    this.shiftTween = gsap.to(this, {
      x: () => -app.refs.footer!.offsetWidth,
      paused: true,
      immediateRender: false,
      scrollTrigger: {
        trigger: app.refs.footer,
        scrub: 1,
        start: 'left right',
        end: 'right right'
      }
    })
  }

  public connectedCallback() {
    this.addEventListener('click', this.onClick)

    this.createShiftTween(app.plugins.portrait?.media)
    app.plugins.portrait?.events.add(this.createShiftTween)

    app.plugins.barba?.hooks.before(() => this.removeAttribute('open'))

    app.plugins.barba?.hooks.after(
      () => this.createShiftTween(app.plugins.portrait?.media)
    )
  }

  public disconnectedCallback() {
    this.shiftTween?.kill()
  }
}
