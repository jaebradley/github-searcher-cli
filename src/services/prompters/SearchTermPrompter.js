import inquirer from 'inquirer';

const promptSearchTerm = async () => (
  inquirer.prompt([
    {
      name: 'queryString',
      message: 'Input your search string',
      validate: searchTerm => searchTerm.length > 0,
      type: 'input',
    },
  ])
);

export default promptSearchTerm;
