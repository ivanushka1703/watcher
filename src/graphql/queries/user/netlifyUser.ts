import { gql } from '@apollo/client';

const NETLIFY_USER_QUERY = gql`
  query netlify_user {
    user @rest(type: "Netlify_User", path: "user", endpoint: "netlify") {
      id
      fullName
      avatar_url
      email
    }
  }
`;

export default NETLIFY_USER_QUERY;
