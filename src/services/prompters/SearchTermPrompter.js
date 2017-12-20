import inquirer from 'inquirer';

const isValidSearchTerm = searchTerm => !!searchTerm && searchTerm.length > 0;

const promptSearchTerm = async () => (
  inquirer.prompt([
    {
      name: 'queryString',
      message: 'Input your search string',
      validate: isValidSearchTerm,
      type: 'input',
    },
  ])
);

export { promptSearchTerm, isValidSearchTerm };
