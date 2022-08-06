import { gql } from 'graphql-request'
import { strapi } from 'strapi'
import type { Contact } from 'types/routes/contact'

export const getContact = () => strapi.request<Contact.Response>(
  gql`
    query Contact {
      contact {
        data {
          attributes {
            header {
              title
              subtitle
              text
            }
          }
        }
      }
    }
  `
)
