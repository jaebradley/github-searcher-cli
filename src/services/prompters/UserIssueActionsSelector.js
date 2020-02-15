import inquirer from 'inquirer';
import {
  Authored,
  Commented,
  Assigned,
  Mentioned,
  Involved,
} from '../../data/constants/github/issue/UserActions';

const isValidUsername = (answersSoFar) => !!answersSoFar
  && !!answersSoFar.username
  && answersSoFar.username.length;

const selectUserIssueActions = async () => (
  inquirer.prompt([
    {
      type: 'input',
      name: 'username',
      message: 'Filter by issue action (authored, committed, etc.) by inputting a username',
    },
    {
      type: 'checkbox',
      name: 'actions',
      message: 'Select issue action',
      when: isValidUsername,
      choices: [
        Authored,
        Commented,
        Assigned,
        Mentioned,
        Involved,
      ],
    },
  ])
);

export { isValidUsername, selectUserIssueActions };
