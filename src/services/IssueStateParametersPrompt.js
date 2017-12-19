import inquirer from 'inquirer';
import State from '../data/constants/State';

class IssueStateParametersPrompt {
  static async prompt() {
    return inquirer.prompt([
      {
        type: 'list',
        name: 'state',
        message: 'Filter by issue state',
        choices: [
          State.OPEN,
          State.CLOSED,
        ],
      },
    ]);
  }
}

export default IssueStateParametersPrompt;
