import inquirer from 'inquirer';
import { Open, Closed } from '../../data/constants/github/issue/State';

const selectIssueState = async () => (
  inquirer.prompt([
    {
      type: 'list',
      name: 'state',
      message: 'Filter by issue state',
      choices: [Open, Closed],
    },
  ])
);

export default selectIssueState;
