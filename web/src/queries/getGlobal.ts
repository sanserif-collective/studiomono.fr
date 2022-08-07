import { gql } from 'graphql-request'
import { strapi } from 'strapi'
import type { Global } from 'types/routes/global'

export const getGlobal = () => strapi.request<Global.Response>(
  gql`
    query Global {
      global {
        data {
          attributes {
            informations {
              location
              email
              phone
            }
            menu {
              link {
                name
                url
              }
            }
            meta {
              title
              description
            }
          }
        }
      }
      dictionary {
        data {
          attributes {
            rights
            next
            website
          }
        }
      }
    }
  `
)

export const getGlobalData = async () => {
  const { global, dictionary } = await getGlobal()
  return {
    ...global.data.attributes,
    dictionary: dictionary.data.attributes
  }
}
