export default `
  type User {
    _id: ID!
    username: String!
    email: String!
    type: String!
  }

  type AuthResponse {
    ok: Boolean!
    token: String
    refreshToken: String
    errors: [Error]
  }

  type CreateUserResponse {
    ok: Boolean!
    errors: [Error]
  }
  
  type Query {
    user: User!
    listUsers: [User]
  }

  type Mutation {
    login(email: String!, password: String!): AuthResponse!
    updateUsernameOrEmail(username: String!, email: String!): Boolean!
    updatePassword(oldPassword: String!, newPassword: String!): AuthResponse!
    createUser(username: String!, type: String!, email: String!, password: String!): CreateUserResponse!
    deleteUser(_id: ID!): Boolean!
  }
`;
