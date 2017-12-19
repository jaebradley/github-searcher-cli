import inquirer from 'inquirer';
import {
  Authored,
  Commented,
  Assigned,
  Mentioned,
  Involved,
} from '../data/constants/github/issue/UserActions';


class UserActionParametersPrompter {
  static async prompt() {
    return inquirer.prompt([
      {
        type: 'input',
        name: 'queryUsername',
        message: 'Input username to filter on',
      },
      {
        type: 'checkbox',
        name: 'actions',
        message: 'Filter by user actions',
        when: answersSoFar => answersSoFar.queryUsername.length > 0,
        choices: [
          Authored,
          Commented,
          Assigned,
          Mentioned,
          Involved,
        ],
      },
    ]);
  }
}

export default UserActionParametersPrompter;
