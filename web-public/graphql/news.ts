import { gql } from '@apollo/client';

export const GET_ALL_NEWS = gql`
  query GetAllNews {
    getAllNews {
      id
      title
      thumbnail
      desc
      content
      category {
        id
        name
      }
      categoryId
      publishDate
      authorName
      authorAvatar
      type
      isActive
      view
      createdAt
    }
  }
`;

export const GET_NEWS_BY_ID = gql`
  query GetNewsById($id: ID!) {
    getNewsById(id: $id) {
      id
      title
      thumbnail
      desc
      content
      category {
        id
        name
      }
      categoryId
      publishDate
      authorName
      authorAvatar
      type
      isActive
      view
    }
  }
`;

export const CREATE_NEWS = gql`
  mutation CreateNews($input: CreateNewsInput!) {
    createNews(input: $input) {
      id
      title
    }
  }
`;

export const UPDATE_NEWS = gql`
  mutation UpdateNews($input: UpdateNewsInput!) {
    updateNews(input: $input) {
      id
      title
    }
  }
`;

export const DELETE_NEWS = gql`
  mutation DeleteNews($id: ID!) {
    deleteNews(id: $id)
  }
`;

export const GET_NEWS_CATEGORIES = gql`
  query GetNewsCategories {
    getNewsCategories
  }
`;

export const GET_NEWS_CATEGORIES_FULL = gql`
  query GetNewsCategoriesFull {
    getNewsCategoriesFull {
      id
      name
    }
  }
`;

export const CREATE_NEWS_CATEGORY = gql`
  mutation CreateNewsCategory($name: String!) {
    createNewsCategory(name: $name) {
      id
      name
    }
  }
`;

export const DELETE_NEWS_CATEGORY = gql`
  mutation DeleteNewsCategory($id: ID!) {
    deleteNewsCategory(id: $id)
  }
`;
