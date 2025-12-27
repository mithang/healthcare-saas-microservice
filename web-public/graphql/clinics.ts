import { gql } from '@apollo/client';

export const GET_ALL_CLINICS = gql`
  query GetAllClinics {
    getAllClinics {
      id
      name
      address
      phone
      email
      description
      images
      specialties
      openingHours
      rating
      isVerified
      createdAt
      updatedAt
    }
  }
`;

export const GET_CLINIC_BY_ID = gql`
  query GetClinicById($id: ID!) {
    getClinicById(id: $id) {
      id
      name
      address
      phone
      email
      description
      images
      specialties
      openingHours
      rating
      isVerified
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_CLINIC = gql`
  mutation CreateClinic($input: CreateClinicInput!) {
    createClinic(input: $input) {
      id
      name
      address
      phone
      email
      description
      images
      specialties
      openingHours
      rating
      isVerified
    }
  }
`;

export const UPDATE_CLINIC = gql`
  mutation UpdateClinic($input: UpdateClinicInput!) {
    updateClinic(input: $input) {
      id
      name
      address
      phone
      email
      description
      images
      specialties
      openingHours
      rating
      isVerified
    }
  }
`;

export const DELETE_CLINIC = gql`
  mutation DeleteClinic($id: ID!) {
    deleteClinic(id: $id)
  }
`;
