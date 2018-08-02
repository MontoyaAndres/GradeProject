export default `
  type PasswordResponse {
    ok: Boolean!
    errors: [Error]
  }

  type Mutation {
    SendEmail(email: String!): PasswordResponse!
    SendToken(token: String!, password: String!): Boolean!
  }
`;
