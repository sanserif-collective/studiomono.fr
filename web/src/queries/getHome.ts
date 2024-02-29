import { gql } from 'graphql-request';
import { strapi } from 'strapi';
import type { Home } from 'types/routes/home';

export const getHome = () =>
  strapi.request<Home.Response>(gql`
    fragment HomeProject on ProjectEntityResponse {
      data {
        attributes {
          name
          slug
          cover {
            data {
              attributes {
                provider_metadata
              }
            }
          }
        }
      }
    }

    query Home {
      home {
        data {
          attributes {
            header {
              title
              subtitle
              text
            }
            next {
              link {
                name
                route
              }
              caption
            }
            meta {
              title
              description
            }
            projects {
              __typename
              ... on ComponentHomeOneProject {
                project {
                  ...HomeProject
                }
              }
              ... on ComponentHomeTwoProjects {
                project1 {
                  ...HomeProject
                }
                project2 {
                  ...HomeProject
                }
              }
              ... on ComponentHomeThreeProjects {
                project1 {
                  ...HomeProject
                }
                project2 {
                  ...HomeProject
                }
                project3 {
                  ...HomeProject
                }
              }
            }
          }
        }
      }
    }
  `);
