import { STRAPI_TOKEN, STRAPI_URL } from 'env'
import { GraphQLClient } from 'graphql-request'

export const strapi = new GraphQLClient(STRAPI_URL, {
  headers: {
    authorization: `Bearer ${STRAPI_TOKEN}`
  }
})
