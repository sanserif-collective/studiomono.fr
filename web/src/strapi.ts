import { STRAPI_TOKEN, STRAPI_URL } from 'env'
import { GraphQLClient } from 'graphql-request'
import { getGlobal } from './queries/getGlobal'

export const strapi = new GraphQLClient(STRAPI_URL, {
  headers: {
    authorization: `Bearer ${STRAPI_TOKEN}`
  }
})

const getGlobalData = async () => {
  const { global, dictionary } = await getGlobal()
  return {
    ...global.data.attributes,
    dictionary: dictionary.data.attributes
  }
}

!(async () => global.strapi = await getGlobalData())()
