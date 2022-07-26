import type { Cloudinary } from 'types/cloudinary'

export namespace Strapi {
  export type Attributes <Attr> = { attributes: Attr }
  export type Data <Attr> = { data: Attributes<Attr> }

  export type Image = Data<{
    provider_metadata: Cloudinary.Metadata
  }>
}
