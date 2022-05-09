import { gql } from 'apollo-server';

export default gql`
  type EditDescription {
    ok: Boolean!
    error: String
  }
  type Mutation {
    editDescription(id: Int!, description: String): EditDescription
  }
`;
