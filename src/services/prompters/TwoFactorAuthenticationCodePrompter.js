import inquirer from 'inquirer';

const validateAuthenticationCode = (code) => !!code && code.length > 0;

const promptTwoFactorAuthenticationCode = async (message) => (
  inquirer.prompt([
    {
      name: 'twoFactorAuthenticationCode',
      validate: validateAuthenticationCode,
      type: 'password',
      message,
    },
  ])
);

export { validateAuthenticationCode, promptTwoFactorAuthenticationCode };
