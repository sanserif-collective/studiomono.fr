import type { Strapi } from './strapi'

export namespace Shared {
  export type Link = {
    name: string
    url: string
  }

  export type LinkWithCaption = {
    link: Link
    caption: string
  }

  export namespace SEO {
    export type Meta = {
      title: string
      description: string
    }
  }

  export type Subservices = {
    name: string
  }

  export type Service = Strapi.Attributes<{
    name: string
    subservices: Subservices[]
  }>

  export type Member = Strapi.Attributes<{
    name: string
    role: string
    image: Strapi.Image
  }>
}
