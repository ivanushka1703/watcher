import { gql } from '@apollo/client';

const NETLIFY_SITES_QUERY = gql`
  query netlify_sites($filter: String, $page: Int, $per_page: Int) {
    netlify_sites(filter: $filter, page: $page, per_page: $per_page)
      @rest(
        type: "Netlify_Site"
        path: "sites?filter={args.filter}&page={args.page}&per_page={args.per_page}"
        endpoint: "netlify"
      ) {
      id
      name
      url
      account_name
      updated_at
      created_at
      published_deploy @type(name: "Published_Deploy") {
        id
        branch
        published_at
      }
    }
  }
`;

export default NETLIFY_SITES_QUERY;
