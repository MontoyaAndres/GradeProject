export default `
  type compareResponse {
    ok: Boolean!
    students: [Student]
    errors: [Error]
  }

  type Query {
    compareStudents(periodSelected: [String!], career: String!): compareResponse!
  }
`;
