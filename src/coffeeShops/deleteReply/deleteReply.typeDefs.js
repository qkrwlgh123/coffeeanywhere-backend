import { gql } from 'apollo-server';

export default gql`
  type DeleteReplyResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    deleteReply(id: Int): DeleteReplyResult
  }
`;
