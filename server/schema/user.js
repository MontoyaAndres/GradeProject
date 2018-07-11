export default `
  type User {
    _id: ID!
    username: String!
    email: String!
  }

  type AuthResponse {
    ok: Boolean!
    token: String
    refreshToken: String
    errors: [Error]
  }
  
  type Query {
    user: User!
  }

  type Mutation {
    login(email: String!, password: String!): AuthResponse!
    updateUsernameOrEmail(username: String!, email: String!): Boolean!
    updatePassword(oldPassword: String!, newPassword: String!): AuthResponse!
  }
`;
