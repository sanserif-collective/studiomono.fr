import type { Global } from 'types/routes/global';
import type { Shared } from 'types/shared';
import type { Strapi } from 'types/strapi';

export type App = {
  global?: Global.Components;
  dictionary?: Global.Dictionary;
  projects?: Strapi.Attributes<Shared.Project.Components>[];
};
