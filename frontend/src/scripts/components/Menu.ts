import { gsap } from 'gsap/all';
import { app } from 'scripts/app';
import { setColors, setHeaderColor } from 'scripts/features/color';
import type { Marquee } from './Marquee';

export class Menu extends HTMLElement {
  private marquees = this.querySelectorAll<Marquee>('sanserif-marquee');
  private links = this.querySelectorAll<HTMLAnchorElement>('[data-nav-link]');
  private smalls = this.querySelectorAll('[data-nav-small]');

  private onForward() {
    setColors(['#C9C9C9', '#FFF', '#EAEAEA']);
    setHeaderColor('#FFF');
    this.marquees.forEach((marquee) => marquee.play());
  }

  private onBackward() {
    const { progressColor, cursorColor, cursorColorHover } = app.globals;
    setColors([progressColor!, cursorColor!, cursorColorHover!]);
    setHeaderColor('#151515');
    this.marquees.forEach((marquee) => marquee.pause());
  }

  public toggle = gsap
    .timeline({ paused: true })
    .from(this, {
      yPercent: 100,
      duration: 2,
      ease: 'power4.inOut',
    })
    .add(() => {
      if (this.toggle.reversed()) {
        return this.onBackward();
      }

      this.onForward();
    }, '-=0.7')
    .from(
      this.marquees,
      {
        yPercent: 100,
        stagger: 0.1,
        ease: 'power3.out',
      },
      '-=0.75',
    )
    .from(
      this.smalls,
      {
        yPercent: 100,
        stagger: 0.05,
        duration: 0.5,
        ease: 'power3.out',
      },
      '-=0.1',
    );

  public open = () => {
    this.toggle.play();
    this.setAttribute('open', '');
  };

  public close = async () => {
    await this.toggle.reverse().then();
    this.removeAttribute('open');
  };

  private setCurrentLink() {
    this.links.forEach((link) => {
      if (link.href === location.href) {
        return link.classList.remove('opacity-25', 'hover:opacity-50');
      }

      link.classList.add('opacity-25', 'hover:opacity-50');
    });
  }

  public connectedCallback() {
    this.style.display = '';
    app.plugins.barba?.hooks.after(() => this.setCurrentLink());
    app.plugins.barba?.hooks.before(() => {
      this.close();
    });
  }
}
