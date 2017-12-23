import inquirer from 'inquirer';
import InquirerAutocompletePrompt from 'inquirer-autocomplete-prompt';
import fuzzy from 'fuzzy';

inquirer.registerPrompt('autocomplete', InquirerAutocompletePrompt);

class RepositorySelector {
  constructor(repositorySearcher) {
    this.repositorySearcher = repositorySearcher;
    this.repositoryNames = null;
  }

  async select() {
    return inquirer.prompt([
      {
        name: 'organizationName',
        message: 'Input optional organization/user name',
        type: 'input',
      },
      {
        name: 'repositoryName',
        message: 'Input optional repository name',
        type: 'autocomplete',
        when: answersSoFar => answersSoFar.organizationName.length > 0,
        source: (answersSoFar, searchTerm) => {
          const searchTermValue = searchTerm || '';
          return this.findMatchingRepositories(answersSoFar.organizationName, searchTermValue);
        },
      },
    ]);
  }

  async findMatchingRepositories(organizationName, repositoryName) {
    return this.repositorySearcher
      .searchRepositories(organizationName, repositoryName)
      .then(result => result.data.items.map(repository => repository.name))
      .then((repositoryNames) => {
        let names = ['None'];
        names = names.concat(repositoryNames);
        return fuzzy.filter(repositoryName, names).map(match => match.original);
      });
  }
}

export default RepositorySelector;
