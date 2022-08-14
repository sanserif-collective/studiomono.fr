import ASScroll from '@ashthornton/asscroll'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { App } from 'scripts/app/types'

const createVelocityWatcher = () => {
  const last = { time: 0, position: 0 }

  return (currentPos: number) => {
    const currentTime = Date.now()

    const delayInMs = currentTime - last.time

    const offsetPos = currentPos - last.position
    const speedInPxPerMs = offsetPos / delayInMs

    last.time = currentTime
    last.position = currentPos

    return speedInPxPerMs
  }
}

const asscroll: App.Plugin = {
  install(app) {
    const scroll = new ASScroll({
      disableRaf: true,
      customScrollbar: false,
      touchScrollType: 'transform',
      touchEase: 0.2,
      containerElement: '[data-asscroll-container]',
      scrollElements: '[data-asscroll-element]'
    })

    // Recalculate page max scroll and toggle horizontal/portrait.
    const refresh = (isPortrait: boolean) => {
      scroll.disable()
      scroll.enable({
        horizontalScroll: !isPortrait,
        newScrollElements: document.querySelector<HTMLElement>(
          '[data-asscroll-element]'
        )
      })
    }

    // Calculate scroll velocity to use across the app.
    const getVelocity = createVelocityWatcher()
    const setVelocity = () => app.globals.scrollVelocity = getVelocity(scroll.currentPos)

    // Link ASScroll and ScrollTrigger.
    ScrollTrigger.defaults({
      horizontal: true,
      scroller: scroll.containerElement
    })

    ScrollTrigger.scrollerProxy(scroll.containerElement, {
      scrollTop(value = 0) {
        return (arguments.length && scroll)
          ? scroll.currentPos = value
          : scroll.currentPos
      },
      scrollLeft(value = 0) {
        return (arguments.length && scroll)
          ? scroll.currentPos = value
          : scroll.currentPos
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight
        }
      },
      pinType: 'transform'
    })

    scroll.on('update', ScrollTrigger.update)
    ScrollTrigger.addEventListener('refresh', scroll.resize)

    // Toggle vertical and horizontal scrolling.
    refresh(app.plugins.portrait.media.matches)
    app.plugins.portrait.events.add(({ matches }) => refresh(matches))

    // Prevent user from scrolling before changing page.
    app.plugins.barba.hooks.before(() => scroll.disable({ inputOnly: true }))

    // Refresh ASSCroll and ScrollTrigger after page change.
    app.plugins.barba.hooks.after(async () => {
      const triggerRefresh = gsap.delayedCall(0.75, ScrollTrigger.refresh)

      scroll.currentPos = 0
      refresh(app.plugins.portrait.media.matches)

      await triggerRefresh.then()
      triggerRefresh.kill()
    })

    // Initialize smooth scrolling.
    gsap.ticker.add(scroll.update)
    gsap.ticker.add(setVelocity)
    app.plugins.scroll = scroll
  }
}

export default asscroll
