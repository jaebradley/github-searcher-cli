import GitHubClient from 'github';

class RepositorySearcher {
  constructor(authorizationToken) {
    this.client = new GitHubClient({ headers: { 'user-agent': 'jaebradley' } });
    this.client.authenticate({
      type: 'token',
      token: authorizationToken,
    });
  }

  async search(organizationName, repoNameContains) {
    return this.client.search.repos({ q: `org:${organizationName} ${repoNameContains}` });
  }
}

export default RepositorySearcher;
