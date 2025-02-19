import type { Shared } from 'types/shared';
import type { Strapi } from 'types/strapi';

export namespace About {
  export type Header = {
    title: string;
    subtitle: string;
    text: string;
    image: Strapi.Image;
  };

  export type Services = {
    title: string;
  };

  export type Team = {
    title: string;
    subtitle: string;
  };

  export type Components = {
    header: Header;
    services: Services;
    team: Team;
    next: Shared.LinkWithCaption;
    meta: Shared.SEO.Meta;
  };

  export type Response = {
    about: Strapi.Data<Strapi.Attributes<Components>>;
    services: Strapi.Data<Shared.Service[]>;
    members: Strapi.Data<Shared.Member[]>;
  };
}
