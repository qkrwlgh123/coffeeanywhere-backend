import { gql } from 'apollo-server';

export default gql`
  type AddPhotoResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    addPhoto(id: Int, file: Upload): AddPhotoResult
  }
`;
