export default `
  scalar JSON

  type graphicsResponse {
    ok: Boolean!
    values: JSON
    errors: [Error]
  }

  type Query {
    Graphics(CodigoPrograma: String!, TipoSemestre: String!, graphicBy: String!, isVariable: String): graphicsResponse!
  }
`;
