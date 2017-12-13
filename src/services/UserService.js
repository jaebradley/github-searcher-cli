import GitHub from 'github';

class UserService {
  constructor() {
    this.client = new GitHub();
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
