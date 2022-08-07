import type { Shared } from 'types/shared'
import type { Strapi } from 'types/strapi'

export namespace Projects {
  export type Response = {
    projects: Strapi.Data<Strapi.Attributes<Shared.Project.Components>[]>
    meta: Shared.SEO.Meta
  }
}
