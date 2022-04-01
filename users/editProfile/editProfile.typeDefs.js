import { gql } from 'apollo-server';

export default gql`
  type EditProfileResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    editProfile(
      id: String
      name: String
      username: String
      email: String
      password: String
      location: String
      githubUsername: String
      avatar: Upload
    ): EditProfileResult!
  }
`;
