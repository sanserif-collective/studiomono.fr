import type { ITransitionPage } from '@barba/core'
import { gsap } from 'gsap/all'
import { app } from 'scripts/app'

export class Transition implements ITransitionPage {
  private static loader = document.querySelector('[data-loader]')
  private static logo = document.querySelector('[data-loader-logo]')
  private static shutter = document.querySelector('[data-loading-shutter]')
  private static translater = document.querySelector('[data-loading-translater]')

  private static reveal = gsap
    .timeline({
      paused: true,
      delay: 2
    })
    .to(this.loader, {
      yPercent: 100,
      ease: 'power4.inOut',
      duration: 2
    })
    .to(this.logo, {
      yPercent: 100,
      ease: 'power3.in'
    }, 0.3)

  private static leaving = gsap
    .timeline({ paused: true })
    .to(this.translater, {
      x: window.innerWidth / 2,
      ease: 'power3.in',
      duration: 1
    })
    .to(this.shutter, {
      scaleX: 1,
      transformOrigin: 'left',
      ease: 'power3.in',
      duration: 1
    }, 0)

  private static entering = gsap
    .timeline({ paused: true })
    .fromTo(this.translater, {
      x: -window.innerWidth / 2,
      runBackwards: true
    }, {
      x: 0,
      duration: 1,
      ease: 'power3.out'
    })
    .to(this.shutter, {
      scaleX: 0,
      transformOrigin: 'right',
      ease: 'power3.out',
      duration: 1
    }, 0)

  public static once = () => this.reveal.play()

  public static async leave() {
    if (app.refs.menu?.hasAttribute('open')) return

    this.leaving.restart()
  }

  public static async enter() {
    if (app.refs.menu?.hasAttribute('open')) return

    await this.leaving.then()
    this.entering.restart()
  }
}
