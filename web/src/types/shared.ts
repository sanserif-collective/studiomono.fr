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
}
