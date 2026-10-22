import { STRAPI_URL, STRAPI_TOKEN } from 'astro:env/server';
import { GraphQLClient } from 'graphql-request';

export const strapi = new GraphQLClient(STRAPI_URL, {
  fetch,
  headers: {
    Authorization: `Bearer ${STRAPI_TOKEN}`,
  },
});
