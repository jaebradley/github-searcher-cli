import { Octokit } from '@octokit/rest';

class AuthorizationService {
  constructor(username, password) {
    this.username = username;
    this.password = password;
    this.client = new Octokit();
    this.client.authenticate({
      type: 'basic',
      username: this.username,
      password: this.password,
    });
  }

  async createWithTwoFactorAuthentication(twoFactorAuthenticationCode) {
    const twoFactorAuthenticationHeaders = { headers: { 'X-GitHub-OTP': twoFactorAuthenticationCode } };
    const response = await this.client.authorization.create({
      ...twoFactorAuthenticationHeaders,
      ...AuthorizationService.getConfiguration(),
    });
    return {
      token: response.data.token,
      id: response.data.id,
    };
  }

  async create() {
    const response = await this.client
      .authorization
      .create(AuthorizationService.getConfiguration());
    return {
      token: response.data.token,
      id: response.data.id,
    };
  }

  async deleteWithTwoFactorAuthentication(id, twoFactorAuthenticationCode) {
    return this.client.authorization.delete({ headers: { 'X-GitHub-OTP': twoFactorAuthenticationCode }, id });
  }

  async delete(id) {
    return this.client.authorization.delete({ id });
  }

  static getConfiguration() {
    return {
      scopes: ['read:user', 'repo'],
      note: 'GitHubSearcherCLI',
      note_url: 'https://github.com/jaebradley/github-searcher-cli/',
    };
  }
}

export default AuthorizationService;
