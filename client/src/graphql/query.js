import gql from 'graphql-tag';

const studentDistinct = gql`
  query StudentDistinct($param: String!) {
    StudentDistinct(Param: $param)
  }
`;

export { studentDistinct };
