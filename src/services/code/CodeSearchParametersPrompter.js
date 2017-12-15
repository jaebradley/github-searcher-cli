import inquirer from 'inquirer';
import InquirerAutocompletePrompt from 'inquirer-autocomplete-prompt';
import fuzzy from 'fuzzy';

import GitHubLanguages from '../../data/constants/github/languages';

inquirer.registerPrompt('autocomplete', InquirerAutocompletePrompt);

class CodeSearchParametersPrompter {
  constructor(repositorySearcher) {
    this.repositorySearcher = repositorySearcher;
    this.repositoryNames = null;
  }

  async promptSearchParameters() {
    return inquirer.prompt([
      {
        name: 'queryString',
        message: 'Input your search string',
        validate: str => str.length > 0,
        type: 'input',
      },
      {
        name: 'organizationName',
        message: 'Input optional organization/user name',
        type: 'input',
      },
      {
        name: 'repositoryName',
        message: 'Input optional repository name',
        type: 'autocomplete',
        source: (answersSoFar, searchTerm) => {
          const searchTermValue = searchTerm || '';
          return this.findMatchingRepositories(answersSoFar.organizationName, searchTermValue);
        },
      },
      {
        name: 'language',
        message: 'Choose optional language',
        type: 'autocomplete',
        source: (answersSoFar, input) => (
          Promise.resolve(fuzzy.filter(input || '', GitHubLanguages).map(match => match.original))
        ),
      },
    ]);
  }

  async findMatchingRepositories(organizationName, repositoryName) {
    return this.repositorySearcher
      .search(organizationName, repositoryName)
      .then(result => result.data.items.map(repository => repository.name))
      .then((repositoryNames) => {
        let names = ['None'];
        names = names.concat(repositoryNames);
        return fuzzy.filter(repositoryName, names).map(match => match.original);
      });
  }
}

export default CodeSearchParametersPrompter;
