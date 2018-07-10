export default `
  type User {
    _id: ID!
    username: String!
    email: String!
  }

  type LoginResponse {
    ok: Boolean!
    token: String
    refreshToken: String
    errors: [Error]
  }

  type Query {
    user: User!
  }

  type Mutation {
    login(email: String!, password: String!): LoginResponse!
    updateUsernameOrEmail(username: String, email: String): Boolean!
  }
`;
