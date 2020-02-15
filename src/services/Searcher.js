import { Octokit } from '@octokit/rest';

import { buildSearchQuery } from './SearchQueryBuilder';

class Searcher {
  constructor(accessToken) {
    this.client = new Octokit({ headers: { Accept: 'application/vnd.github.v3.text-match+json' } });
    this.client.authenticate({
      type: 'token',
      token: accessToken,
    });
  }

  async searchIssues(searchTerms) {
    return this.client.search.issues({ q: buildSearchQuery(searchTerms) });
  }

  async searchCode(options) {
    return this.client.search.code({ q: buildSearchQuery(options) });
  }

  async searchRepositories(organizationName, repositoryName) {
    if (!organizationName) {
      throw new Error('Organization name must be defined when searching repositories');
    }
    return this.client.search.repos({ q: `org:${organizationName} ${repositoryName || ''}` });
  }
}

export default Searcher;
