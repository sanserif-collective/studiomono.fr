import { Cloudinary } from '@cloudinary/url-gen'
import { CLOUDINARY_KEY, CLOUDINARY_NAME, CLOUDINARY_SECRET } from 'env'

export const cloudinary = new Cloudinary({
  cloud: {
    apiKey: CLOUDINARY_KEY,
    apiSecret: CLOUDINARY_SECRET,
    cloudName: CLOUDINARY_NAME
  }
})
