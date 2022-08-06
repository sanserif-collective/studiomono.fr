import type { Cloudinary } from 'types/cloudinary'

export namespace Strapi {
  export type Attributes <Attr> = { attributes: Attr }
  export type Data <Data> = { data: Data }

  export type Image = Data<
    Attributes<{
      alternativeText?: string
      provider_metadata: Cloudinary.Metadata
    }>
  >
}
