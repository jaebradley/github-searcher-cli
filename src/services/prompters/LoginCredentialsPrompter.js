import inquirer from 'inquirer';

class LoginCredentialsPrompter {
  constructor(userService) {
    this.userService = userService;
  }

  async prompt() {
    return inquirer.prompt([
      {
        name: 'username',
        message: 'Input your GitHub Username',
        validate: (username) => this.validateUsername(username),
        type: 'input',
      },
      {
        name: 'password',
        message: 'Input your GitHub password',
        validate: LoginCredentialsPrompter.validatePassword,
        type: 'password',
      },
    ]);
  }

  async validateUsername(username) {
    const usernameExists = await this.userService.usernameExists(username);

    if (usernameExists) {
      return true;
    }

    return `${username} is not a valid username`;
  }

  static validatePassword(password) {
    if (password && password.length > 0) {
      return true;
    }

    return 'Please enter a valid password';
  }
}

export default LoginCredentialsPrompter;
