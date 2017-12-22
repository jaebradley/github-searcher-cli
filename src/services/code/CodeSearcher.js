import GitHubClient from 'github';
import { buildSearchQuery } from '../SearchQueryBuilder';

class CodeSearcher {
  constructor(authorizationToken) {
    this.authorizationToken = authorizationToken;
    this.client = new GitHubClient({
      headers: {
        accept: 'application/vnd.github.v3.text-match+json',
        'user-agent': 'jaebradley',
      },
    });
    this.client.authenticate({
      type: 'token',
      token: this.authorizationToken,
    });
  }

  async search(options) {
    return this.client.search.code({ q: buildSearchQuery(options) });
  }
}

export default CodeSearcher;
