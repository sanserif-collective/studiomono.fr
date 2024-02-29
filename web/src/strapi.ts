import { STRAPI_URL } from 'env'
import { GraphQLClient } from 'graphql-request'

export const strapi = new GraphQLClient(STRAPI_URL)
