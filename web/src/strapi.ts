import { STRAPI_TOKEN, STRAPI_URL } from 'env'
import { GraphQLClient } from 'graphql-request'

export default new GraphQLClient(STRAPI_URL, {
  headers: {
    authorization: `Bearer ${STRAPI_TOKEN}`
  }
})
