import { gsap, ScrollTrigger } from 'gsap/all';
import { app } from 'scripts/app';

export class Services extends HTMLElement {
  private media = gsap.matchMedia();
  private fadesTrigger?: ScrollTrigger;
  private subservicesTriggers?: ScrollTrigger;

  private fades = gsap.from(this.firstElementChild!.children, {
    opacity: 0,
    x: 20,
    paused: true,
    stagger: 0.05,
    ease: 'power3.out',
  });

  public connectedCallback() {
    this.media.add('(orientation: landscape)', () => {
      this.fades.time(0);

      this.subservicesTriggers = ScrollTrigger.create({
        trigger: this.previousElementSibling,
        pin: this.firstElementChild,
        start: () => `left ${app.refs.footer?.offsetWidth}px`,
        end: () =>
          `right ${(this.firstElementChild as HTMLElement).offsetWidth + (app.refs.footer?.offsetWidth ?? 0) + window.innerHeight / 20}px`,
      });

      this.fadesTrigger = ScrollTrigger.create({
        trigger: this.previousElementSibling,
        start: 'left left',
        end: 'right left',
        toggleActions: 'play reverse play reverse',
        animation: this.fades,
      });

      return () => {
        this.fadesTrigger?.kill();
        this.subservicesTriggers?.kill();
        this.fadesTrigger = undefined;
        this.subservicesTriggers = undefined;
      };
    });

    this.media.add('(orientation: portrait)', () => {
      this.fades.time(1);
    });
  }

  public disconnectedCallback() {
    this.media.revert();
    this.fades.kill();
  }
}
