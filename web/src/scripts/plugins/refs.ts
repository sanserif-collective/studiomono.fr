import type { App } from 'scripts/app/types';

export const refs: App.Plugin = {
  install(app) {
    app.refs.menu = document.querySelector('sanserif-menu')!;
    app.refs.footer = document.querySelector('[data-footer]')!;

    app.plugins.barba?.hooks.afterEnter((data) => {
      app.refs.footer = data?.next.container.querySelector('[data-footer]')!;
    });
  },
};
