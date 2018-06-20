export default `
  type User {
    _id: ID!
    username: String!
    email: String!
  }

  type RegisterResponse {
    ok: Boolean!
    user: User
    errors: [Error]
  }

  type LoginResponse {
    ok: Boolean!
    token: String
    refreshToken: String
    errors: [Error]
  }

  type Mutation {
    register(username: String!, email: String!, password: String!): RegisterResponse!
    login(email: String!, password: String!): LoginResponse!
  }
`;
