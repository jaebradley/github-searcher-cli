import GitHubClient from 'github'; // eslint-disable-line import/no-extraneous-dependencies

import GitHubDataStorer from './GitHubDataStorer';

class SearchService {
  constructor() {
    this.client = new GitHubClient({
      headers: {
        accept: 'application/vnd.github.v3.text-match+json',
        'user-agent': 'jaebradley',
      },
    });
  }

  async searchRepositories(organizationName, repoNameContains) {
    this.client.authenticate({
      type: 'token',
      token: await GitHubDataStorer.getAuthorizationToken(),
    });
    return new Promise((resolve, reject) => {
      this.client.search.repos({ q: `org:${organizationName} ${repoNameContains}` }, (error, response) => {
        if (error) {
          reject(error);
        }
        resolve(response);
      });
    });
  }

  async searchCode(options) {
    this.client.authenticate({
      type: 'token',
      token: await GitHubDataStorer.getAuthorizationToken(),
    });
    return new Promise((resolve, reject) => {
      this.client.search.code(
        { q: SearchService.generateQueryString(options) },
        (error, response) => {
          if (error) {
            reject(error);
          }
          resolve(response);
        },
      );
    });
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

export default SearchService;
