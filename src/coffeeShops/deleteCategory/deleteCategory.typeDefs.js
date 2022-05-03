import { gql } from 'apollo-server';

export default gql`
  type DeleteCategoryResult {
    ok: Boolean
    error: String
  }
  type Mutation {
    deleteCategory(id: Int): DeleteCategoryResult
  }
`;
