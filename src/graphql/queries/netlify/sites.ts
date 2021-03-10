import { gql } from '@apollo/client';

const NETLIFY_SITES_QUERY = gql`
  query netlify_sites {
    netlify_sites @rest(type: "Netlify_Site", path: "sites", endpoint: "netlify") {
      id
      name
      slug
      url
      account_name
      account_slug
    }
  }
`;

export default NETLIFY_SITES_QUERY;
