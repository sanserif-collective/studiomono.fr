import e from 'env-var';

const env = e.from(typeof import.meta === 'undefined' ? process.env : import.meta.env);

export const STRAPI_URL = env.get('STRAPI_URL').required().asUrlString();
