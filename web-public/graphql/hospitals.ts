import { gql } from '@apollo/client';

export const GET_ALL_HOSPITALS = gql`
  query GetAllHospitals {
    getAllHospitals {
      id
      name
      address
      phone
      email
      description
      images
      departments
      beds
      facilities
      rating
      isVerified
      createdAt
      updatedAt
    }
  }
`;

export const GET_HOSPITAL_BY_ID = gql`
  query GetHospitalById($id: ID!) {
    getHospitalById(id: $id) {
      id
      name
      address
      phone
      email
      description
      images
      departments
      beds
      facilities
      rating
      isVerified
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_HOSPITAL = gql`
  mutation CreateHospital($input: CreateHospitalInput!) {
    createHospital(input: $input) {
      id
      name
      address
      phone
      email
      description
      images
      departments
      beds
      facilities
    }
  }
`;

export const UPDATE_HOSPITAL = gql`
  mutation UpdateHospital($input: UpdateHospitalInput!) {
    updateHospital(input: $input) {
      id
      name
      address
      phone
      email
      description
      images
      departments
      beds
      facilities
      isVerified
    }
  }
`;

export const DELETE_HOSPITAL = gql`
  mutation DeleteHospital($id: ID!) {
    deleteHospital(id: $id)
  }
`;
