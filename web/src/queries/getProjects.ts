import { gql } from 'graphql-request'
import { app } from 'src/app'
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
      projects(pagination: { pageSize: 25 }) {
        data {
          attributes {
            slug
            color
            name
            cover {
              data {
                attributes {
                  alternativeText
                  provider_metadata
                }
              }
            }
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
                  ...Image
                }
              }
              ...on ComponentProjectFullscreenImage {
                image {
                  ...Image
                }
              }
              ...on ComponentProjectImageAndText {
                text
                optionalImage: image {
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
                optionalImage1: image1 {
                  ...Image
                }
                optionalImage2: image2 {
                  ...Image
                }
              }
              ...on ComponentProjectCenteredVerticalImage {
                image {
                  ...Image
                }
              }
              ...on ComponentProjectTwoImagesVertical {
                image1 {
                  ...Image
                }
                image2 {
                  ...Image
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
    }
  `
)

export const getAppProjects = async () => {
  if (!app.projects) {
    const { projects } = await getProjects()
    app.projects = projects.data
  }

  return app.projects
}
