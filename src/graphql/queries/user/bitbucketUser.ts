import { gql } from '@apollo/client';

const BITBUCKET_USER_QUERY = gql`
  query bitbucket_user {
    user @rest(type: "Bitbucket_User", path: "user", endpoint: "bitbucket") {
      uuid
      username
      display_name
    }
  }
`;

export default BITBUCKET_USER_QUERY;
