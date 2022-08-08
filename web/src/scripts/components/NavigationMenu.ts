import { gsap } from 'gsap/all'
import { app } from 'scripts/app'
import { setCursorColor, setCursorColorHover } from 'scripts/utilities/cursor'
import type { Marquee } from './Marquee'

export default class NavigationMenu extends HTMLElement {
  private marquees = this.querySelectorAll<Marquee>('marquee-carousel')
  private links = this.querySelectorAll<HTMLAnchorElement>('[data-nav-link]')
  private smalls = this.querySelectorAll('[data-nav-small]')
  private setAccent = gsap.quickSetter(document.body, '--header-color')

  public toggle = gsap.timeline({ paused: true })
    .from(this, {
      yPercent: 100,
      duration: 2,
      ease: 'power4.inOut'
    })
    .add(() => {
      if (this.toggle.reversed()) {
        this.setAccent('#151515')
        setCursorColor(app.globals.cursorColor)
        setCursorColorHover(app.globals.cursorColorHover)
        return this.marquees.forEach(marquee => marquee.pause())
      }

      setCursorColor('#fff')
      setCursorColorHover('#C9C9C9')
      this.setAccent('#EAEAEA')
      this.marquees.forEach(marquee => marquee.play())
    }, '-=0.7')
    .from(this.marquees, {
      yPercent: 100,
      stagger: 0.1,
      ease: 'power3.out'
    }, '-=0.75')
    .from(this.smalls, {
      yPercent: 100,
      stagger: 0.05,
      duration: 0.5,
      ease: 'power3.out'
    }, '-=0.1')

  public open = () => {
    this.toggle.play()
    this.setAttribute('open', '')
  }

  public close = async () => {
    await this.toggle.reverse().then()
    this.removeAttribute('open')
  }

  private setCurrentLink() {
    this.links.forEach(link => {
      if (link.href === location.href) {
        return link.classList.remove('opacity-25', 'hover:opacity-50')
      }

      link.classList.add('opacity-25', 'hover:opacity-50')
    })
  }

  public connectedCallback() {
    this.style.display = ''
    app.refs.menu = this

    app.plugins.barba.hooks.after(() => this.setCurrentLink())
  }
}
