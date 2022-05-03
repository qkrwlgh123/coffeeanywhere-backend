import { gql } from 'apollo-server';

export default gql`
  type AddCategoryResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    addCategory(id: Int!, name: String!): AddCategoryResult
  }
`;
