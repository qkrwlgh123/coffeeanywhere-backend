import { gql } from 'apollo-server';

export default gql`
  type AddReplyResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    addReply(id: Int, content: String): AddReplyResult
  }
`;
