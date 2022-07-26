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

const asscroll: App.Plugin = {
  install(app) {
    const scroll = new ASScroll({
      disableRaf: true,
      ease: 0.05,
      customScrollbar: false,
      limitLerpRate: false,
      touchScrollType: 'transform'
    })

    const refresh = (isPortrait: boolean) => {
      if (isPortrait) {
        scroll.disable()
        return scroll.enable()
      }

      scroll.disable()
      scroll.enable({ horizontalScroll: true })
    }

    const getVelocity = velocity()

    gsap.ticker.add(() => {
      scroll.update()
      app.globals.scrollVelocity = getVelocity(scroll)
    })

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

    refresh(app.plugins.portrait.media.matches)
    app.plugins.portrait.events.add(({ matches }) => refresh(matches))

    app.plugins.scroll = scroll
  }
}

export default asscroll
