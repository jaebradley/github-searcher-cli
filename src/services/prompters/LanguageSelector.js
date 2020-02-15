import inquirer from 'inquirer';
import InquirerAutocompletePrompt from 'inquirer-autocomplete-prompt';
import fuzzy from 'fuzzy';

import GitHubLanguages from '../../data/constants/github/Languages';

inquirer.registerPrompt('autocomplete', InquirerAutocompletePrompt);

const findMatches = (searchTerm) => (
  fuzzy.filter(searchTerm, GitHubLanguages).map((match) => match.original)
);

const applyFiltering = (answersSoFar, input) => (Promise.resolve(findMatches(input || '')));

const selectLanguage = async () => (
  inquirer.prompt([
    {
      name: 'language',
      message: 'Choose optional language',
      type: 'autocomplete',
      source: applyFiltering,
    },
  ])
);

export {
  selectLanguage,
  applyFiltering,
  findMatches,
};
