import { gql } from 'apollo-server';

export default gql`
  type AddLikeResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    addLike(id: Int, like: Boolean): AddLikeResult
  }
`;
