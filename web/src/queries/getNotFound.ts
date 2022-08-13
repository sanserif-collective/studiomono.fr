import { gql } from 'graphql-request'
import { strapi } from 'strapi'
import type { NotFound } from 'types/routes/not-found'

export const getNotFound = () => strapi.request<NotFound.Response>(
  gql`
    query NotFound {
      notFound {
        data {
          attributes {
            title
            subtitle
            text
          }
        }
      }
    }
  `
)
