import { gql } from '@apollo/client';

export const GET_REPOS = gql`
query getRepos($username: String!) {
  user(login: $username) {
    name
    avatarUrl
    followers {
      totalCount
    }
    following {
      totalCount
    }
    repositories (first: 100) {
      nodes {
        id
        name
        url
        projectsUrl
        updatedAt
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
}  
`


