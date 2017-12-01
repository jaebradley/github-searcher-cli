import inquirer from 'inquirer';
import keytar from 'keytar';

class GitHubCredentialSaver {
  static async save() {
    const { oauthToken } = await GitHubCredentialSaver.getPrompt();
    await GitHubCredentialSaver.saveCredential(oauthToken);
  }

  static async getPrompt() {
    return inquirer.prompt([
      {
        name: 'oauthToken',
        message: 'Input your GitHub OAuth Token',
        validate: str => str.length > 0,
        type: 'password',
      },
    ]);
  }

  static async saveCredential(value) {
    return keytar.setPassword('GitHubCredentialSaver', 'GitHubOAuthCredential', value);
  }

  static async getCredential() {
    return keytar.getPassword('GitHubCredentialSaver', 'GitHubOAuthCredential');
  }

  static async hasCredential() {
    const credential = await GitHubCredentialSaver.getCredential();
    return !!credential;
  }
}


export default GitHubCredentialSaver;
