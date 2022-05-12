import { gql } from 'apollo-server';

export default gql`
  type EditOpen {
    ok: Boolean!
    error: String
  }
  type Mutation {
    editOpen(id: Int!, open: Boolean): EditOpen
  }
`;
