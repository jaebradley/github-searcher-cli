import GitHub from 'github';

import { buildSearchQuery } from './SearchQueryBuilder';

class Searcher {
  constructor(accessToken) {
    this.client = GitHub();
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

  async searchRepositories(organizationName, repoNameContains) {
    return this.client.search.repos({ q: `org:${organizationName} ${repoNameContains}` });
  }
}

export default Searcher;
