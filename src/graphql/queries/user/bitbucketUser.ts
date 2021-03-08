import { gql } from '@apollo/client';

const BITBUCKET_USER_QUERY = gql`
  query bitbucket_user {
    bitbucket_user @rest(type: "Bitbucket_User", path: "user", endpoint: "bitbucket") {
      uuid
      account_id
      username
      display_name
      links {
        avatar {
          href
        }
      }
    }
  }
`;

export default BITBUCKET_USER_QUERY;
