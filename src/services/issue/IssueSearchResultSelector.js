import inquirer from 'inquirer';
import InquirerAutocompletePrompt from 'inquirer-autocomplete-prompt';
import fuzzy from 'fuzzy';
import open from 'open';

import IssueFormatter from './IssueFormatter';

inquirer.registerPrompt('autocomplete', InquirerAutocompletePrompt);

class IssueSearchResultSelector {
  constructor() {
    this.issueUrls = {};
    this.matches = [];
    this.choices = [];
  }

  async select(issues) {
    this.choices = this.getChoices(issues);

    const selection = await inquirer.prompt([
      {
        name: 'issue',
        message: 'Choose issue',
        type: 'autocomplete',
        source: (answersSoFar, input) => (
          Promise.resolve(fuzzy.filter(input || '', this.matches).map((match) => match.original))
        ),
        pageSize: 50,
      },
    ]);

    open(this.issueUrls[selection.issue]);
  }

  getChoices(issues) {
    const choices = [];
    issues.forEach((issue) => {
      const message = IssueFormatter.format(issue);
      this.issueUrls[message] = issue.html_url;
      choices.push({
        name: message,
        short: issue.title,
      });
      this.matches.push(message);
    });
    return choices;
  }
}

export default IssueSearchResultSelector;
