import { gql } from '@apollo/client';

const GITHUB_USER_QUERY = gql`
  query github_user {
    user @rest(type: "Github_User", path: "user", endpoint: "github") {
      id
      name
      avatar_url
      email
    }
  }
`;

export default GITHUB_USER_QUERY;
