import { gql } from '@apollo/client';

export const GET_ALL_USERS = gql`
  query GetAllUsers {
    getAllUsers {
      id
      fullName
      email
      role {
        id
        name
      }
      isActive
      createdAt
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;

export const GET_USER = gql`
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      fullName
      email
      phoneNumber
      isActive
      role {
        id
        name
      }
      createdAt
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      fullName
      role {
        id
        name
      }
      isActive
    }
  }
`;

export const RESET_PASSWORD = gql`
  mutation ResetPassword($id: ID!) {
    resetPassword(id: $id)
  }
`;
