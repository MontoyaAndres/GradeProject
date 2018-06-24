import gql from 'graphql-tag';

const studentDistinct = gql`
  {
    StudentDistinct(Param: "TipoSemestre")
  }
`;

export { studentDistinct };
