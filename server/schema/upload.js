export default `
  scalar Upload

  type uploadResponse {
    ok: Boolean!
    values: [String]
    errors: [Error]
  }

  type Mutation {
    uploadFile(file: Upload!, period: String!): uploadResponse!
  }
`;
