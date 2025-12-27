import { gql } from '@apollo/client';

export const GET_ALL_PHARMACIES = gql`
  query GetAllPharmacies {
    getAllPharmacies {
      id
      name
      address
      phone
      email
      description
      images
      openingHours
      rating
      isVerified
      createdAt
      updatedAt
    }
  }
`;

export const GET_PHARMACY_BY_ID = gql`
  query GetPharmacyById($id: ID!) {
    getPharmacyById(id: $id) {
      id
      name
      address
      phone
      email
      description
      images
      openingHours
      rating
      isVerified
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_PHARMACY = gql`
  mutation CreatePharmacy($input: CreatePharmacyInput!) {
    createPharmacy(input: $input) {
      id
      name
      address
      phone
      email
      description
      images
      openingHours
    }
  }
`;

export const UPDATE_PHARMACY = gql`
  mutation UpdatePharmacy($input: UpdatePharmacyInput!) {
    updatePharmacy(input: $input) {
      id
      name
      address
      phone
      email
      description
      images
      openingHours
      isVerified
    }
  }
`;

export const DELETE_PHARMACY = gql`
  mutation DeletePharmacy($id: ID!) {
    deletePharmacy(id: $id)
  }
`;
