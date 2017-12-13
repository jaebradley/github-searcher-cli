import keytar from 'keytar';

const SERVICE_NAME = 'GitHubDataStorer';
const AUTHORIZATION_TOKEN_ACCOUNT_NAME = 'AuthorizationToken';
const USERNAME_ACCOUNT_NAME = 'Username';
const PASSWORD_ACCOUNT_NAME = 'Password';
const AUTHORIZATION_ID_ACCOUNT_NAME = 'AuthorizationId';

class GitHubDataStorer {
  static async save(accountName, value) {
    return keytar.setPassword(SERVICE_NAME, accountName, value);
  }

  static async get(accountName) {
    return keytar.getPassword(SERVICE_NAME, accountName);
  }

  static async saveAuthorizationToken(value) {
    return GitHubDataStorer.save(AUTHORIZATION_TOKEN_ACCOUNT_NAME, value);
  }

  static async saveUsername(value) {
    return GitHubDataStorer.save(USERNAME_ACCOUNT_NAME, value);
  }

  static async savePassword(value) {
    return GitHubDataStorer.save(PASSWORD_ACCOUNT_NAME, value);
  }

  static async saveAuthorizationId(value) {
    return GitHubDataStorer.save(AUTHORIZATION_ID_ACCOUNT_NAME, value);
  }

  static async getAuthorizationToken() {
    return GitHubDataStorer.get(AUTHORIZATION_TOKEN_ACCOUNT_NAME);
  }

  static async getUsername() {
    return GitHubDataStorer.get(USERNAME_ACCOUNT_NAME);
  }

  static async getPassword() {
    return GitHubDataStorer.get(PASSWORD_ACCOUNT_NAME);
  }

  static async getAuthorizationId() {
    return GitHubDataStorer.get(AUTHORIZATION_ID_ACCOUNT_NAME);
  }

  static async hasAuthorizationToken() {
    return !!GitHubDataStorer.getAuthorizationToken();
  }

  static async hasUsername() {
    return !!GitHubDataStorer.getUsername();
  }

  static async hasPassword() {
    return !!GitHubDataStorer.getPassword();
  }

  static async hasAuthorizationId() {
    return !!GitHubDataStorer.getAuthorizationId();
  }
}


export default GitHubDataStorer;
