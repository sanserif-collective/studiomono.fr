import type { Global } from 'types/routes/global'
import type { Shared } from './shared'
import type { Strapi } from './strapi'

export type App = {
  global?: Global.Components
  dictionary?: Global.Dictionary
  projects?: Strapi.Attributes<Shared.Project.Components>[]
}
