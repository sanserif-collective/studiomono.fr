import { gql } from 'graphql-request';
import { strapi } from 'strapi';
import type { Global } from 'types/routes/global';

export const getGlobal = () =>
  strapi.request<Global.Response>(gql`
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
              links {
                name
                route
              }
            }
            favicon {
              main {
                data {
                  attributes {
                    mime
                    provider_metadata
                  }
                }
              }
            }
            meta {
              title
              description
              thumbnail {
                data {
                  attributes {
                    provider_metadata
                  }
                }
              }
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
  `);
