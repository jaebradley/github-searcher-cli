import inquirer from 'inquirer';

import UserService from '../UserService';

const userService = new UserService();

class SetupCommandPrompter {
  static async promptLoginCredentials() {
    return inquirer.prompt([
      {
        name: 'username',
        message: 'Input your GitHub Username',
        validate: SetupCommandPrompter.validateUsername,
        type: 'input',
      },
      {
        name: 'password',
        message: 'Input your GitHub password',
        validate: SetupCommandPrompter.isValidInput,
        type: 'password',
      },
    ]);
  }

  static async promptTwoFactorAuthenticationCode(message) {
    return inquirer.prompt([
      {
        name: 'twoFactorAuthenticationCode',
        validate: SetupCommandPrompter.validateTextInput,
        type: 'password',
        message,
      },
    ]);
  }

  static async validateUsername(username) {
    const usernameExists = await userService.usernameExists(username);

    if (usernameExists) {
      return true;
    }

    return 'Please enter a valid username';
  }

  static async validateTextInput(input) {
    if (input.length > 0) {
      return true;
    }

    return 'Please enter a valid input';
  }
}

export default SetupCommandPrompter;
