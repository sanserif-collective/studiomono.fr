import gsap from 'gsap/all'
import type Marquee from './Marquee'

export default class NavigationMenu extends HTMLElement {
  private links = this.querySelectorAll<Marquee>('[data-nav-link]')
  private smalls = this.querySelectorAll('[data-nav-small]')
  private setAccent = gsap.quickSetter(document.body, '--header-color')

  private timeline = gsap.timeline({ paused: true })
    .from(this, {
      yPercent: 100,
      duration: 2,
      ease: 'power4.inOut'
    })
    .add(() => {
      if (this.timeline.reversed()) {
        this.setAccent('#151515')
        return this.links.forEach(link => link.pause())
      }

      this.setAccent('#EAEAEA')
      this.links.forEach(link => link.play())
    }, '-=0.7')
    .from(this.links, {
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

  public open = () => this.timeline.play()
  public close = () => this.timeline.reverse()
}
