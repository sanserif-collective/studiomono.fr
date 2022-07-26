import type { Shared } from 'types/shared'
import type { Strapi } from 'types/strapi'

export namespace Home {
  export type Header = {
    title: string
    subtitle: string
    text: string
  }

  export type ProjectSetLayout =
    'ComponentHomeOneProject' |
    'ComponentHomeTwoProjects' |
    'ComponentHomeThreeProjects'

  export type Project = {
    name: string
    slug: string
    cover: Strapi.Image
  }

  export type ProjectSet = {
    __typename: ProjectSetLayout
  }

  export type ComponentHomeOneProject = ProjectSet & {
    project: Strapi.Data<Project>
  }

  export type ComponentHomeTwoProjects = ProjectSet & {
    project1: Strapi.Data<Project>
    project2: Strapi.Data<Project>
  }

  export type ComponentHomeThreeProjects = ProjectSet & {
    project1: Strapi.Data<Project>
    project2: Strapi.Data<Project>
    project3: Strapi.Data<Project>
  }

  export type Components = {
    header: Header
    next: Shared.LinkWithCaption
    projects: ProjectSet[]
    meta: Shared.SEO.Meta
  }

  export type Response = {
    home: Strapi.Data<Components>
  }
}
