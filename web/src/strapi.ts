import { STRAPI_URL } from 'astro:env/server';
import { GraphQLClient } from 'graphql-request';

export const strapi = new GraphQLClient(STRAPI_URL, { fetch });
