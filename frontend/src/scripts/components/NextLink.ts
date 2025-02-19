import { gsap } from 'gsap/all';
import SplitType from 'split-type';

export class NextLink extends HTMLElement {
  private topChars = new SplitType(this.querySelectorAll('[data-split]:first-of-type'));

  private bottomChars = new SplitType(this.querySelectorAll('[data-split]:last-of-type'));

  private rotate = gsap
    .timeline({ paused: true })
    .to(this.topChars.chars, {
      rotateX: -90,
      yPercent: -50,
      stagger: 0.1,
      ease: 'power3.inOut',
      transformOrigin: 'center',
      duration: 0.75,
    })
    .from(
      this.bottomChars.chars,
      {
        rotateX: 90,
        yPercent: 50,
        stagger: 0.1,
        transformOrigin: 'center',
        ease: 'power3.inOut',
        duration: 0.75,
      },
      0.125,
    );

  private onMouseEnter = () => this.rotate.play();
  private onMouseLeave = () => this.rotate.reverse();

  public connectedCallback() {
    this.addEventListener('mouseenter', this.onMouseEnter);
    this.addEventListener('mouseleave', this.onMouseLeave);
  }

  public disconnectedCallback() {
    this.rotate.kill();
  }
}
