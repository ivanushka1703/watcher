import { gql } from '@apollo/client';

const GITHUB_REPOSITORIES_QUERY = gql`
  query github_repositories(
    $type: String
    $sort: String
    $direction: String
    $per_page: Int
    $page: Int
  ) {
    github_repositories(
      type: $type
      sort: $sort
      direction: $direction
      per_page: $per_page
      page: $page
    )
      @rest(
        type: "Github_Repository"
        path: "user/repos?type={args.type}&sort={args.sort}&direction={args.direction}&per_page={args.per_page}&page={args.page}"
        endpoint: "github"
      ) {
      id
      name @export(as: "repo")
      url
      default_branch
      updated_at
      created_at
      owner @type(name: "Github_User") {
        id
        login @export(as: "owner")
        avatar_url
      }
      actions
        @rest(
          path: "repos/{exportVariables.owner}/{exportVariables.repo}/actions/workflows"
          type: ["Github_Action"]
        ) {
        id
        name
        state
        updated_at
        badge_url
      }
    }
  }
`;

export default GITHUB_REPOSITORIES_QUERY;
