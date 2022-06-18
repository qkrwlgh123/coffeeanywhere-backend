import { gql } from 'apollo-server';

export default gql`
  type editReplyResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    editReply(id: Int, content: String): editReplyResult
  }
`;
