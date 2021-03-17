import { Site } from 'typings';

const formatSites = (sites?: any[]): Array<Site> => {
  return (sites || []).map(site => ({
    id: site.id,
    name: site.name,
    url: site.url,
    account: site.account_name,
    status: site.published_deploy?.state,
    branch: site.published_deploy?.branch,
    updatedAt: site.published_deploy?.published_at || site.updated_at,
    createdAt: site.created_at,
  }));
};

export default formatSites;
