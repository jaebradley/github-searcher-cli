import inquirer from 'inquirer';
import InquirerAutocompletePrompt from 'inquirer-autocomplete-prompt';
import fuzzy from 'fuzzy';

import SearchOptions from '../data/SearchOptions';
import { LANGUAGES } from '../data/constants';
import SearchService from '../services/SearchService';

inquirer.registerPrompt('autocomplete', InquirerAutocompletePrompt);

class CodeSearchOptions {
  constructor() {
    this.searchService = new SearchService();
    this.repositoryNames = null;
  }

  async getOptions() {
    const {
      queryString,
      organizationName,
      repositoryName,
      language,
    } = await this.getPrompt();
    return new SearchOptions(queryString, organizationName, repositoryName, language);
  }

  async getPrompt() {
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
        source: (answersSoFar, input) => {
          return this.searchService
            .searchRepositories(answersSoFar.organizationName, input || '')
            .then(result => result.data.items.map(repository => repository.name))
            .then((repositoryNames) => {
              this.repositoryNames = repositoryNames;
              return this.getMatchingRepositoryNames(input || '');
            });
        },
      },
      {
        name: 'language',
        message: 'Choose optional language',
        type: 'autocomplete',
        source: (answersSoFar, input) => (
          Promise.resolve(fuzzy.filter(input || '', LANGUAGES).map(match => match.original))
        ),
      },
    ]);
  }

  getMatchingRepositoryNames(name) {
    return fuzzy.filter(name, this.repositoryNames).map(match => match.original);
  }
}

export default CodeSearchOptions;
