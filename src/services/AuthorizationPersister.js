/* eslint-disable no-console */

import GitHubDataStorer from './GitHubDataStorer';
import AuthorizationService from './AuthorizationService';

class AuthorizationPersister {
  constructor(username, password) {
    this.username = username;
    this.password = password;
    this.authorizationService = new AuthorizationService(this.username, this.password);
  }

  async deleteExistingAuthorization() {
    const currentAuthorizationId = await GitHubDataStorer.getAuthorizationId();

    if (currentAuthorizationId) {
      await this.authorizationService.delete(currentAuthorizationId);
    }
  }

  async deleteExistingTwoFactorAuthorization(twoFactorAuthenticationCode) {
    const currentAuthorizationId = await GitHubDataStorer.getAuthorizationId();

    if (currentAuthorizationId) {
      await this.authorizationService.deleteWithTwoFactorAuthentication(currentAuthorizationId, twoFactorAuthenticationCode);
    }
  }

  async saveNewAuthorization() {
    const { id, token } = await this.authorizationService.create();
    await AuthorizationPersister.saveAuthorizationData(this.username, this.password, token, id);
  }

  async saveNewTwoFactorAuthorization(twoFactorAuthenticationCode) {
    const { id, token } = await this.authorizationService
      .createWithTwoFactorAuthentication(twoFactorAuthenticationCode);
    await AuthorizationPersister.saveAuthorizationData(this.username, this.password, token, id);
  }

  static async saveAuthorizationData(username, password, token, authorizationId) {
    await GitHubDataStorer.saveAuthorizationToken(token);
    await GitHubDataStorer.saveUsername(username);
    await GitHubDataStorer.savePassword(password);
    await GitHubDataStorer.saveAuthorizationId(authorizationId);
  }
}

export default AuthorizationPersister;
