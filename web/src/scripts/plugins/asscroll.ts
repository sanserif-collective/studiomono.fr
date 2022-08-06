import ASScroll from '@ashthornton/asscroll'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { App } from 'scripts/app/types'

const velocity = () => {
  const last = { time: 0, position: 0 }

  return ({ currentPos }: ASScroll) => {
    const currentTime = Date.now()

    const delayInMs = currentTime - last.time

    const offsetPos = currentPos - last.position
    const speedInPxPerMs = offsetPos / delayInMs

    last.time = currentTime
    last.position = currentPos

    return speedInPxPerMs
  }
}

const proxyScroll = (scroll: ASScroll) => {
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
}

const asscroll: App.Plugin = {
  install(app) {
    const scroll = new ASScroll({
      disableRaf: true,
      customScrollbar: false,
      touchScrollType: 'transform',
      touchEase: 0.2,
      scrollElements: '[asscroll-element]'
    })

    proxyScroll(scroll)

    const refresh = (isPortrait: boolean, elements?: HTMLElement) => {
      if (isPortrait) {
        scroll.disable()
        scroll.enable({ newScrollElements: elements })
        return ScrollTrigger.refresh(true)
      }

      scroll.disable()
      scroll.enable({ horizontalScroll: true, newScrollElements: elements })
      ScrollTrigger.refresh(true)
    }

    const getVelocity = velocity()

    gsap.ticker.add(() => {
      scroll.update()
      app.globals.scrollVelocity = getVelocity(scroll)
    })

    refresh(app.plugins.portrait.media.matches)
    app.plugins.portrait.events.add(({ matches }) => refresh(matches))

    app.plugins.barba.hooks.before(() => scroll.disable({ inputOnly: true }))
    app.plugins.barba.hooks.after(({ next }) => {
      scroll.currentPos = 0
      refresh(app.plugins.portrait.media.matches, next.container)
      ScrollTrigger.refresh(true)
    })

    app.plugins.scroll = scroll
  }
}

export default asscroll
