import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation SignIn($input: SignInInput!) {
    signIn(signInInput: $input) {
      message
      data {
        AccessToken
        ExpiresIn
        TokenType
        IdToken
        RefreshToken
      }
    }
  }
`;

export const REGISTER_MUTATION = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      id
      email
      fullName
      role {
        name
      }
    }
  }
`;

export const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout {
      message
    }
  }
`;

export const ME_QUERY = gql`
  query Me {
    me {
      id
      email
      fullName
      role {
        name
      }
      phoneNumber
      isActive
    }
  }
`;
