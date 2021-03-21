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
            updated_on
            created_on
            pipelines
              @rest(
                path: "repositories/{exportVariables.workspace}/{exportVariables.repo_slug}/pipelines/"
                type: ["Bitbucket_Pipeline"]
                endpoint: "bitbucket"
              ) {
              values {
                uuid
                created_on
                build_seconds_used
                completed_on
                target @type(name: "Bitbucket_Pipeline_Target") {
                  ref_type
                  ref_name
                }
                state @type(name: "Bitbucket_Pipeline_State") {
                  name
                  result @type(name: "Bitbucket_Pipeline_State_Result") {
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default BITBUCKET_WORKSPACES_QUERY;
