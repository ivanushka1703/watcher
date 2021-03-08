import { gql } from '@apollo/client';

const GITHUB_USER_QUERY = gql`
  query github_user {
    github_user @rest(type: "Github_User", path: "user", endpoint: "github") {
      id
      name
      login
      avatar_url
      email
    }
  }
`;

export default GITHUB_USER_QUERY;
