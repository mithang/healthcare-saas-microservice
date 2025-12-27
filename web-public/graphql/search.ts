import { gql } from '@apollo/client';

export const GET_TOP_SEARCH_KEYWORDS = gql`
  query GetTopSearchKeywords {
    topSearchKeywords {
      id
      keyword
      searchTimes
      isActive
      createdAt
    }
  }
`;

export const CREATE_TOP_SEARCH_KEYWORD = gql`
  mutation CreateTopSearchKeyword($input: CreateTopSearchKeywordInput!) {
    createTopSearchKeyword(input: $input) {
      id
      keyword
      searchTimes
    }
  }
`;

export const UPDATE_TOP_SEARCH_KEYWORD = gql`
  mutation UpdateTopSearchKeyword($input: UpdateTopSearchKeywordInput!) {
    updateTopSearchKeyword(input: $input) {
      id
      keyword
      searchTimes
      isActive
    }
  }
`;

export const DELETE_TOP_SEARCH_KEYWORD = gql`
  mutation DeleteTopSearchKeyword($id: ID!) {
    deleteTopSearchKeyword(id: $id)
  }
`;
