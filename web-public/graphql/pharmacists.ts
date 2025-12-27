import { gql } from '@apollo/client';

export const GET_ALL_PHARMACISTS = gql`
  query GetAllPharmacists {
    getAllPharmacists {
      id
      fullName
      licenseNumber
      pharmacyId
      pharmacy {
        id
        name
      }
      phone
      email
      bio
      avatar
      experience
      isActive
      createdAt
      updatedAt
    }
  }
`;

export const GET_PHARMACIST_BY_ID = gql`
  query GetPharmacistById($id: ID!) {
    getPharmacistById(id: $id) {
      id
      fullName
      licenseNumber
      pharmacyId
      pharmacy {
        id
        name
        address
      }
      phone
      email
      bio
      avatar
      experience
      isActive
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_PHARMACIST = gql`
  mutation CreatePharmacist($input: CreatePharmacistInput!) {
    createPharmacist(input: $input) {
      id
      fullName
      licenseNumber
      pharmacyId
      phone
      email
      bio
      avatar
      experience
    }
  }
`;

export const UPDATE_PHARMACIST = gql`
  mutation UpdatePharmacist($input: UpdatePharmacistInput!) {
    updatePharmacist(input: $input) {
      id
      fullName
      licenseNumber
      pharmacyId
      phone
      email
      bio
      avatar
      experience
      isActive
    }
  }
`;

export const DELETE_PHARMACIST = gql`
  mutation DeletePharmacist($id: ID!) {
    deletePharmacist(id: $id)
  }
`;
