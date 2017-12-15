import GitHubClient from 'github';

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
    return this.client.search.code({ q: CodeSearcher.generateQueryString(options) });
  }

  static generateQueryString(options) {
    let queryString = '';
    if (options.organizationName) {
      if (options.repositoryName && options.repositoryName !== 'None') {
        queryString += `repo:${options.organizationName}/${options.repositoryName}`;
      } else {
        queryString += `org:${options.organizationName}`;
      }
    }

    queryString += ` ${options.queryString}`;

    if (options.language && options.language !== 'None') {
      queryString += ` language:${options.language}`;
    }

    return queryString;
  }
}

export default CodeSearcher;
