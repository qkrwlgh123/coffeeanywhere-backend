import { gql } from 'apollo-server';

export default gql`
  type EditProfileResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    editProfile(
      username: String
      email: String
      description: String
      password: String
      avatar: Upload
    ): EditProfileResult!
  }
`;
