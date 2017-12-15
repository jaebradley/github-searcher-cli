/* eslint-disable no-console */

import AuthorizationPersister from './AuthorizationPersister';
import SetupCommandPrompter from './SetupCommandPrompter';
import { TWO_FACTOR_AUTHENTICATION_CODE_REQUIRED_ERROR_MESSAGE } from '../data/constants';

class SetupCommandService {
  static async execute() {
    try {
      const { username, password } = await SetupCommandPrompter.promptLoginCredentials();

      const authorizationPersister = new AuthorizationPersister(username, password);

      try {
        await authorizationPersister.deleteExistingAuthorization();
      } catch (e) {
        const { message } = JSON.parse(e.message);
        if (message !== TWO_FACTOR_AUTHENTICATION_CODE_REQUIRED_ERROR_MESSAGE) {
          throw e;
        }

        const { twoFactorAuthenticationCode } = await SetupCommandPrompter
          .promptTwoFactorAuthenticationCode('Input two factor authentication code to remove existing authorization');
        await authorizationPersister
          .deleteExistingTwoFactorAuthorization(twoFactorAuthenticationCode);
      }

      try {
        await authorizationPersister.saveNewAuthorization();
        console.log(SetupCommandService.getSuccessMessage());
      } catch (e) {
        const { message } = JSON.parse(e.message);
        if (message !== TWO_FACTOR_AUTHENTICATION_CODE_REQUIRED_ERROR_MESSAGE) {
          throw e;
        } else {
          const { twoFactorAuthenticationCode } = await SetupCommandPrompter
            .promptTwoFactorAuthenticationCode('Input two factor authentication code to create new authorization');
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
