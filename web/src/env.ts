import e from 'env-var'

const env = e.from(typeof import.meta === 'undefined' ? process.env : import.meta.env)

export const STRAPI_URL = env.get('STRAPI_URL').required().asUrlString()

export const CLOUDINARY_NAME = env.get('CLOUDINARY_NAME').required().asString()
export const CLOUDINARY_KEY = env.get('CLOUDINARY_KEY').required().asString()
export const CLOUDINARY_SECRET = env.get('CLOUDINARY_SECRET').required().asString()
