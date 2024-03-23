import e from 'env-var';

const env = e.from(typeof import.meta === 'undefined' ? process.env : import.meta.env);

export const STRAPI_URL = env.get('STRAPI_URL').required().asUrlString();
export const BASE_URL = env.get('BASE_URL').required().asUrlString();
export const PLAUSIBLE_DOMAIN = env.get('PLAUSIBLE_DOMAIN').asString();
export const PLAUSIBLE_URL = env.get('PLAUSIBLE_URL').default(BASE_URL).asUrlString();
