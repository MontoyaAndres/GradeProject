export default `
  scalar Upload

  type uploadResponse {
    ok: Boolean!
    errors: [Error]
  }

  type Mutation {
    uploadFile(file: Upload!): uploadResponse!
  }
`;
