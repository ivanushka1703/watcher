import { gql } from '@apollo/client';

const BITBUCKET_WORKSPACES_QUERY = gql`
  query bitbucket_repositories($sort: String) {
    bitbucket_repositories(sort: $sort)
      @rest(
        type: "Bitbucket_Workspace"
        path: "workspaces?&sort={args.sort}"
        endpoint: "bitbucket"
      ) {
      values {
        uuid
        name
        slug @export(as: "workspace")
        repositories
          @rest(
            path: "repositories/{exportVariables.workspace}"
            type: ["Bitbucket_Repository"]
            endpoint: "bitbucket"
          ) {
          values {
            uuid
            name
            slug @export(as: "repo_slug")
            mainbranch @type(name: "Bitbucket_Repository_Branch") {
              name
            }
            pipelines
              @rest(
                path: "repositories/{exportVariables.workspace}/{exportVariables.repo_slug}/pipelines/"
                type: ["Bitbucket_Repository_Pipeline"]
                endpoint: "bitbucket"
              ) {
              values {
                uuid
                build_seconds_used
                completed_on
              }
            }
          }
        }
      }
    }
  }
`;

export default BITBUCKET_WORKSPACES_QUERY;
