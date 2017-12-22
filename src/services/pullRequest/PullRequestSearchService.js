import GitHub from 'github';

import { buildSearchQuery } from '../SearchQueryBuilder';

class PullRequestSearchService {
  constructor(accessToken) {
    this.client = GitHub();
    this.client.authenticate({
      type: 'token',
      token: accessToken,
    });
  }

  async search(searchTerms) {
    return this.client.search.issues({ q: buildSearchQuery(searchTerms) });
  }
}

export default PullRequestSearchService;
