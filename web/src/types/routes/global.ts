import type { Shared } from 'types/shared'
import type { Strapi } from 'types/strapi'

export namespace Global {
  export type Informations = {
    location: string
    email: string
    phone: string
  }

  export type Menu = {
    link: Shared.Link[]
  }

  export type Favicon = {
    main: Strapi.Image
  }

  export type Components = {
    informations: Informations
    menu: Menu
    meta: Shared.SEO.Meta
  }

  export type Dictionary = {
    rights: string
    next: string
    website: string
  }

  export type Response = {
    global: Strapi.Data<Strapi.Attributes<Components>>
    dictionary: Strapi.Data<Strapi.Attributes<Dictionary>>
  }
}
