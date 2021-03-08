import { gql } from '@apollo/client';

const NETLIFY_USER_QUERY = gql`
  query netlify_user {
    netlify_user @rest(type: "Netlify_User", path: "user", endpoint: "netlify") {
      id
      avatar_url
      full_name
      slug
    }
  }
`;

export default NETLIFY_USER_QUERY;
