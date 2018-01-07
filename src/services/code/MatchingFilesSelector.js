import inquirer from 'inquirer';
import InquirerAutocompletePrompt from 'inquirer-autocomplete-prompt';
import open from 'open';
import fuzzy from 'fuzzy';

import { styleFragment } from './FragmentStyler';

inquirer.registerPrompt('autocomplete', InquirerAutocompletePrompt);

class MatchingFilesSelector {
  constructor() {
    // hacky memoization due to inquirer only passing back selected string
    this.messageToBrowserURLs = {};
    this.matches = [];
    this.choices = [];
  }

  async selectMatchingFile(matches) {
    this.choices = this.getChoices(matches);

    const selection = await inquirer.prompt([
      {
        name: 'matchingFile',
        message: 'Select matching file',
        type: 'autocomplete',
        paginated: false,
        source: (answersSoFar, input) => (
          Promise.resolve(fuzzy.filter(input || '', this.matches).map(match => match.original))
        ),
        pageSize: 50,
      },
    ]);

    open(this.messageToBrowserURLs[selection.matchingFile]);
  }

  getChoices(files) {
    const choices = [];
    files.forEach((file) => {
      const {
        path,
        fullRepositoryName,
        matchingFragments,
      } = file;
      matchingFragments.forEach((fragment) => {
        const message = styleFragment({
          filePath: path,
          repositoryName: fullRepositoryName,
          fragment,
        });
        this.messageToBrowserURLs[message] = file.browserURL;
        choices.push({
          name: message,
          short: path,
        });
        this.matches.push(message);
        choices.push(new inquirer.Separator());
      });
    });
    return choices;
  }
}

export default MatchingFilesSelector;
