import type { Shared } from 'types/shared'
import type { Strapi } from 'types/strapi'

export namespace Home {
  export type Header = {
    title: string
    subtitle: string
    text: string
  }

  export namespace Projects {
    export type Layouts =
      'ComponentHomeOneProject' |
      'ComponentHomeTwoProjects' |
      'ComponentHomeThreeProjects'

    export type Set = {
      __typename: Layouts
    }

    export namespace Components {
      export type OneProject = Set & {
        project: Strapi.Data<Strapi.Attributes<Shared.Project.Components>>
      }

      export type TwoProjects = Set & {
        project1: Strapi.Data<Strapi.Attributes<Shared.Project.Components>>
        project2: Strapi.Data<Strapi.Attributes<Shared.Project.Components>>
      }

      export type ThreeProjects = Set & {
        project1: Strapi.Data<Strapi.Attributes<Shared.Project.Components>>
        project2: Strapi.Data<Strapi.Attributes<Shared.Project.Components>>
        project3: Strapi.Data<Strapi.Attributes<Shared.Project.Components>>
      }
    }
  }

  export type Components = {
    header: Header
    next: Shared.LinkWithCaption
    projects: Projects.Set[]
    meta: Shared.SEO.Meta
  }

  export type Response = {
    home: Strapi.Data<Strapi.Attributes<Components>>
  }
}
