import { gsap, ScrollTrigger } from 'gsap/all'
import { app } from 'scripts/app'

const transformer = gsap.utils.pipe(
  gsap.utils.wrapYoyo(-0.5, 0.5),
  gsap.utils.mapRange(-0.5, 0.5, 5, 25)
)

export class Team extends HTMLElement {
  private nameTrigger: ScrollTrigger

  private images = [...this.querySelectorAll<HTMLElement>('[data-member-image]')]
  private nameWrapper = this.querySelector<HTMLElement>('[data-member-names]')
  private names = this.querySelectorAll('[data-member-name]')
  private current = 0

  private translates = Array.from(
    this.names,
    name => {
      return gsap.from(name.children, {
        paused: true,
        opacity: 0,
        stagger: 0.1,
        x: 40,
        ease: 'power3.out',
        duration: 1
      })
    }
  )

  private getCurrent() {
    return this.images.reduce((biggest, _, current) => {
      if (this.images[biggest].offsetWidth > this.images[current].offsetWidth) {
        return biggest
      }

      return current
    }, 0)
  }

  private scales = Array.from(
    this.images,
    (image, index) => {
      const widthSet = gsap.quickSetter(image, 'width', 'vh')

      return ScrollTrigger.create({
        trigger: image.parentElement,
        scrub: true,
        onUpdate: async ({ progress, isActive }) => {
          widthSet(transformer(progress))

          if (isActive) this.current = this.getCurrent()

          await Promise.all(this.translates.map(
            (translate, index) => index === this.current
              ? Promise.resolve()
              : translate.reverse().then()
          ))

          if (
            this.current === index &&
            !this.translates[this.current].isActive() &&
            !this.translates[index].isActive()
          ) {
            this.translates[index].play()
            this.current = index
          }
        }
      })
    }
  )

  public connectedCallback() {
    ScrollTrigger.matchMedia({
      '(orientation: landscape)': () => {
        this.nameTrigger = ScrollTrigger.create({
          trigger: this.firstElementChild,
          pin: true,
          start: () => `left ${app.refs.footer.offsetWidth}`,
          end: () => `+=${this.offsetWidth - this.nameWrapper.offsetWidth}`,
          onEnter: () => this.translates[0].play()
        })
      }
    })
  }

  public disconnectedCallback() {
    this.scales.forEach(trigger => trigger.kill())
    this.nameTrigger?.kill()
  }
}
