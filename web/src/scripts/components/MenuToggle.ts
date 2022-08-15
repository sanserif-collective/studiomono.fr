import { gsap, ScrollTrigger } from 'gsap/all'
import { app } from 'scripts/app'

export class MenuToggle extends HTMLElement {
  private translateTween: gsap.core.Tween | null = null

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

  public connectedCallback() {
    ScrollTrigger.matchMedia({
      '(orientation: landscape)': () => {
        this.translateTween = gsap.to(this, {
          x: () => -app.refs.footer?.offsetWidth!,
          paused: true,
          scrollTrigger: {
            trigger: app.refs.footer!,
            scrub: 1,
            start: 'left right',
            end: 'right right'
          }
        })
      }
    })

    this.addEventListener('click', this.onClick)

    app.plugins.barba?.hooks.before(() => {
      this.removeAttribute('open')
      // this.translateTween.kill()
    })

    app.plugins.barba?.hooks.after(() => {
      // this.translateTween.progress(0)
      // this.translateTween.scrollTrigger.refresh()
    })
  }

  public disconnectedCallback() {
    this.translateTween?.kill()
  }
}
