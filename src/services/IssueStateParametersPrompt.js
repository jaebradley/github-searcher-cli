import inquirer from 'inquirer';
import { Open, Closed } from '../data/constants/github/issue/State';

class IssueStateParametersPrompt {
  static async prompt() {
    return inquirer.prompt([
      {
        type: 'list',
        name: 'state',
        message: 'Filter by issue state',
        choices: [Open, Closed],
      },
    ]);
  }
}

export default IssueStateParametersPrompt;
