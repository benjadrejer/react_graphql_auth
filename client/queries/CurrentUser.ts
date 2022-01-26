import { gql } from '@apollo/client';

export default gql`
  {
    me {
      id
      email
    }
  }
`
