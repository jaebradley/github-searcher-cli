import inquirer from 'inquirer';
import InquirerAutocompletePrompt from 'inquirer-autocomplete-prompt';
import fuzzy from 'fuzzy';
import open from 'open';

import PullRequestFormatter from './PullRequestFormatter';

inquirer.registerPrompt('autocomplete', InquirerAutocompletePrompt);

class PullRequestSearchResultSelector {
  constructor() {
    this.pullRequestUrls = {};
    this.matches = [];
    this.choices = [];
  }

  async select(pullRequests) {
    this.choices = this.getChoices(pullRequests);

    const selection = await inquirer.prompt([
      {
        name: 'pullRequest',
        message: 'Choose pull request',
        type: 'autocomplete',
        source: (answersSoFar, input) => (
          Promise.resolve(fuzzy.filter(input || '', this.matches).map((match) => match.original))
        ),
        pageSize: 50,
      },
    ]);

    open(this.pullRequestUrls[selection.pullRequest]);
  }

  getChoices(pullRequests) {
    const choices = [];
    pullRequests.forEach((pr) => {
      const message = PullRequestFormatter.format(pr);
      this.pullRequestUrls[message] = pr.html_url;
      choices.push({
        name: message,
        short: pr.title,
      });
      this.matches.push(message);
    });
    return choices;
  }
}

export default PullRequestSearchResultSelector;
