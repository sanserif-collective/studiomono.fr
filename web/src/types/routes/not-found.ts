import type { Strapi } from 'types/strapi'

export namespace NotFound {
  export type Components = {
    title: string
    subtitle: string
    text: string
  }

  export type Response = {
    notFound: Strapi.Data<Strapi.Attributes<Components>>
  }
}
