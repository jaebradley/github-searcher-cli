/* eslint-disable no-console */

import AuthorizationPersister from '../AuthorizationPersister';
import { TwoFactorAuthenticationRequiredErrorMessage } from '../../data/constants/github/Errors';
import UserService from '../UserService';
import LoginCredentialsPrompter from '../prompters/LoginCredentialsPrompter';
import { promptTwoFactorAuthenticationCode } from '../prompters/TwoFactorAuthenticationCodePrompter';

class SetupCommandService {
  static async execute() {
    try {
      const userService = new UserService();
      const loginCredentialsPrompter = new LoginCredentialsPrompter(userService);
      const { username, password } = await loginCredentialsPrompter.prompt();

      const authorizationPersister = new AuthorizationPersister(username, password);

      try {
        await authorizationPersister.deleteExistingAuthorization();
      } catch (e) {
        const { message } = JSON.parse(e.message);
        if (message !== TwoFactorAuthenticationRequiredErrorMessage) {
          throw e;
        }

        const { twoFactorAuthenticationCode } = await promptTwoFactorAuthenticationCode('Input two factor authentication code to remove existing authorization');
        await authorizationPersister
          .deleteExistingTwoFactorAuthorization(twoFactorAuthenticationCode);
      }

      try {
        await authorizationPersister.saveNewAuthorization();
        console.log(SetupCommandService.getSuccessMessage());
      } catch (e) {
        const { message } = JSON.parse(e.message);
        if (message !== TwoFactorAuthenticationRequiredErrorMessage) {
          throw e;
        } else {
          const { twoFactorAuthenticationCode } = await promptTwoFactorAuthenticationCode('Input two factor authentication code to create new authorization');
          await authorizationPersister.saveNewTwoFactorAuthorization(twoFactorAuthenticationCode);
          console.log(SetupCommandService.getSuccessMessage());
        }
      }
    } catch (e) {
      console.error(`❌ Setup Failed Due To ${e}`);
    }
  }

  static getSuccessMessage() {
    return '✅  Credentials Were Successfully Saved';
  }

  static getFailureMessage() {
    return '❌  Authentication Failed';
  }
}

export default SetupCommandService;
