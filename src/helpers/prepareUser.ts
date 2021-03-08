import { ProviderName } from 'data/providers';

export interface User {
  id: string;
  username?: string;
  email?: string;
  name?: string;
  avatar_url?: string;
}

const prepareUser = (provider: ProviderName, user?: any | null): User | null => {
  if (!user) return null;

  switch (provider) {
    case 'bitbucket':
      return {
        id: user.account_id,
        username: user.username,
        name: user.display_name,
        avatar_url: user.links?.avatar?.href,
      };
    case 'github':
      return {
        id: user.id,
        username: user.login,
        email: user.email,
        name: user.name,
        avatar_url: user.avatar_url,
      };
    default:
      return {
        id: user.id,
        username: user.slug,
        email: user.email,
        name: user.full_name,
        avatar_url: user.avatar_url,
      };
      break;
  }
};

export default prepareUser;
