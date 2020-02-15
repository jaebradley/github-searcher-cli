import { Octokit } from '@octokit/rest';

class UserService {
  constructor() {
    this.client = new Octokit();
  }

  async usernameExists(username) {
    try {
      await this.client.users.getForUser({ username });
      return true;
    } catch (e) {
      return false;
    }
  }
}

export default UserService;
