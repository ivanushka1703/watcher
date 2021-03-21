import { ProviderName } from 'data/providers';
import { last } from 'lodash';
import { Site } from 'typings';

const formatSites = (data: unknown, provider: ProviderName): Array<Site> => {
  switch (provider) {
    case 'bitbucket':
      return (((data as any)?.values as any[]) || []).reduce((acc, workspace) => {
        const { name: account, repositories } = workspace;

        const sites = (repositories?.values || [])
          .map((r: any) => {
            const lastPipeline: any = last(r.pipelines?.values);

            return {
              id: r.uuid,
              name: r.name,
              account,
              branch: lastPipeline?.target?.ref_name || r.mainbranch?.name,
              updatedAt: lastPipeline?.completed_on || r.updated_on,
              createdAt: r.created_on,
              status: lastPipeline?.state?.result?.name,
            };
          })
          .filter((s: Site) => s.status);

        acc.push(...sites);

        return acc;
      }, []);
    default:
      return ((data || []) as any[]).map(site => ({
        id: site.id,
        name: site.name,
        url: site.url,
        account: site.account_name || site.owner?.login,
        status: site.published_deploy?.state,
        branch: site.published_deploy?.branch,
        updatedAt: site.published_deploy?.published_at || site.updated_at,
        createdAt: site.created_at,
      }));
  }
};

export default formatSites;
