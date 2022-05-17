import { gql } from 'apollo-server';

export default gql`
  type DeleteLikeResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    deleteLike(id: Int): DeleteLikeResult
  }
`;
