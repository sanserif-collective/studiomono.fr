import type { Shared } from 'types/shared'
import type { Strapi } from 'types/strapi'

export namespace Contact {
  export type Header = {
    title: string
    subtitle: string
    text: string
  }

  export type Components = {
    header: Header
    meta: Shared.SEO.Meta
  }

  export type Response = {
    contact: Strapi.Data<Strapi.Attributes<Components>>
  }
}
