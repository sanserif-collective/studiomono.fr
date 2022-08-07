import { gql } from 'graphql-request'
import { strapi } from 'strapi'
import type { Projects } from 'types/routes/projects'

export const getProjects = () => strapi.request<Projects.Response>(
  gql`
    fragment Image on UploadFileEntityResponse {
      data {
        attributes {
          provider_metadata
        }
      }
    }
    query Projects {
      projects {
        data {
          attributes {
            slug
            color
            name
            services {
              data {
                attributes {
                  name
                }
              }
            }
            header {
              text
              image {
                ...Image
              }
            }
            introduction {
              text
              url
            }
            subject {
              __typename
              ...on ComponentProjectCenteredImage {
                image {
                  ... Image
                }
              }
              ...on ComponentProjectFullscreenImage {
                image {
                  ... Image
                }
              }
              ...on ComponentProjectImageAndText {
                text
                image {
                  ...Image
                }
              }
              ...on ComponentProjectThreeImages {
                image1 {
                  ...Image
                }
                image2 {
                  ...Image
                }
                image3 {
                  ...Image
                }
              }
              ...on ComponentProjectTwoImagesAndOneText {
                text
                image1 {
                  ...Image
                }
                image2 {
                  ...Image
                }
              }
            }
          }
        }
      }
    }
  `
)
