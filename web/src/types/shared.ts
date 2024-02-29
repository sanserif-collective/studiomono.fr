import type { Strapi } from './strapi'

export namespace Shared {
  export type Link = {
    name: string
    url: string
  }

  export enum Routes {
    'home' = '/',
    'about' = '/about',
    'contact' = '/contact',
    'projects' = '/projects'
  }

  export type InternalLink = {
    name: string
    route: keyof typeof Routes
  }

  export type LinkWithCaption = {
    link: InternalLink
    caption: string
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

  export namespace Project {
    export type Header = {
      text: string
      image: Strapi.Image
    }

    export type Introduction = {
      text: string
      url: string
    }

    export namespace Subject {
      export type Layouts =
        'ComponentProjectCenteredImage' |
        'ComponentProjectFullscreenImage' |
        'ComponentProjectImageAndText' |
        'ComponentProjectThreeImages' |
        'ComponentProjectTwoImagesAndOneText' |
        'ComponentProjectTwoImagesVertical' |
        'ComponentProjectCenteredVerticalImage'

      export type Set = {
        __typename: Layouts
      }

      export namespace Components {
        export type CenteredImage = {
          image: Strapi.Image
        }

        export type FullscreenImage = {
          image: Strapi.Image
        }

        export type ImageAndText = {
          text?: string
          image: Strapi.Image
        }

        export type ThreeImages = {
          image1: Strapi.Image
          image2: Strapi.Image
          image3: Strapi.Image
        }

        export type TwoImagesAndOneText = {
          text?: string
          image1: Strapi.Image
          image2: Strapi.Image
        }

        export type TwoImagesVertical = {
          image1: Strapi.Image
          image2: Strapi.Image
        }

        export type CenteredVerticalImage = {
          image: Strapi.Image
        }
      }
    }

    export type Components = {
      slug: string
      color: string
      name: string
      cover: Strapi.Image
      header: Header
      introduction: Introduction
      subject: Subject.Set[]
      services: Strapi.Data<Service[]>
      meta: SEO.Meta
    }
  }

  export namespace SEO {
    export type Meta = {
      title?: string
      description?: string
      thumbnail: Strapi.Image
    }
  }
}
