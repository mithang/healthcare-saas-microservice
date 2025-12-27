import { gql } from '@apollo/client';

export const GET_ALL_ROLES = gql`
  query GetAllRoles {
    getAllRoles {
      id
      name
      description
      users {
        id
      }
      createdAt
    }
  }
`;

export const GET_ROLE = gql`
  query GetRole($id: ID!) {
    getRole(id: $id) {
      id
      name
      description
      createdAt
    }
  }
`;

export const CREATE_ROLE = gql`
  mutation CreateRole($input: CreateRoleInput!) {
    createRole(createRoleInput: $input) {
      id
      name
      description
    }
  }
`;

export const UPDATE_ROLE = gql`
  mutation UpdateRole($id: ID!, $input: UpdateRoleInput!) {
    updateRole(id: $id, updateRoleInput: $input) {
      id
      name
      description
    }
  }
`;

export const DELETE_ROLE = gql`
  mutation DeleteRole($id: ID!) {
    deleteRole(id: $id)
  }
`;
