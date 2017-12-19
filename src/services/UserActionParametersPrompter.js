import inquirer from 'inquirer';
import {
  AUTHORED,
  COMMENTED,
  ASSIGNED,
  MENTIONED,
  INVOLVED,
} from '../data/constants/prompts/pullRequest/Options';


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
          AUTHORED,
          COMMENTED,
          ASSIGNED,
          MENTIONED,
          INVOLVED,
        ],
      },
    ]);
  }
}

export default UserActionParametersPrompter;
