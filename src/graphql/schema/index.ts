import { gql } from '@apollo/client'

export const ADD_STAR_MUTATION = gql`
  mutation AddStar($id: ID!) {
    addStar(input: { starrableId: $id }) {
      starrable {
        stargazers {
          totalCount
        }
      }
    }
  }
`

export const REMOVE_STAR_MUTATION = gql`
  mutation RemoveStar($id: ID!) {
    removeStar(input: { starrableId: $id }) {
      starrable {
        stargazers {
          totalCount
        }
      }
    }
  }
`

export const GET_REPOSITORIES = gql`
  query User(
    $login: String!
    $orderBy: RepositoryOrder
    $first: Int
    $ownerAffiliations: [RepositoryAffiliation]
    $after: String
    $before: String
    $last: Int
  ) {
    user(login: $login) {
      avatarUrl
      name
      bio
      repositories(
        orderBy: $orderBy
        first: $first
        ownerAffiliations: $ownerAffiliations
        after: $after
        before: $before
        last: $last
      ) {
        nodes {
          id
          name
          url
          stargazerCount
          viewerHasStarred
          primaryLanguage {
            name
            color
          }
        }
        totalCount
        pageInfo {
          hasNextPage
          hasPreviousPage
          endCursor
          startCursor
        }
      }
    }
  }
`

export const SEARCH_REPOS = gql`
  query Repository(
    $query: String!
    $type: SearchType!
    $first: Int
    $last: Int
    $before: String
    $after: String
  ) {
    search(query: $query, type: $type, first: $first, last: $last, before: $before, after: $after) {
      repositoryCount
      nodes {
        ... on Repository {
          id
          name
          stargazerCount
          viewerHasStarred
          url
          createdAt
          owner {
            avatarUrl
            url
            ... on User {
              name
              login
            }
          }
          primaryLanguage {
            name
            color
          }
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
    }
  }
`
