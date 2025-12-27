import { gql } from '@apollo/client';

export const GET_ALL_DOCTORS = gql`
  query GetAllDoctors {
    getAllDoctors {
      id
      fullName
      specialty
      qualifications
      experience
      clinicId
      clinic {
        id
        name
      }
      hospitalId
      hospital {
        id
        name
      }
      phone
      email
      bio
      avatar
      rating
      consultationFee
      isActive
      createdAt
      updatedAt
    }
  }
`;

export const GET_DOCTOR_BY_ID = gql`
  query GetDoctorById($id: ID!) {
    getDoctorById(id: $id) {
      id
      fullName
      specialty
      qualifications
      experience
      clinicId
      clinic {
        id
        name
        address
      }
      hospitalId
      hospital {
        id
        name
        address
      }
      phone
      email
      bio
      avatar
      rating
      consultationFee
      isActive
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_DOCTOR = gql`
  mutation CreateDoctor($input: CreateDoctorInput!) {
    createDoctor(input: $input) {
      id
      fullName
      specialty
      qualifications
      experience
      clinicId
      hospitalId
      phone
      email
      bio
      avatar
      consultationFee
    }
  }
`;

export const UPDATE_DOCTOR = gql`
  mutation UpdateDoctor($input: UpdateDoctorInput!) {
    updateDoctor(input: $input) {
      id
      fullName
      specialty
      qualifications
      experience
      clinicId
      hospitalId
      phone
      email
      bio
      avatar
      consultationFee
      isActive
    }
  }
`;

export const DELETE_DOCTOR = gql`
  mutation DeleteDoctor($id: ID!) {
    deleteDoctor(id: $id)
  }
`;
