import UserService from '../UserService';
import LoginCredentialsPrompter from '../prompters/LoginCredentialsPrompter';
import { handleCredentialError } from './CredentialErrorHandler';

const getLoginCredentials = async () => {
  const loginCredentialsPrompter = new LoginCredentialsPrompter(new UserService());
  const { username, password } = await loginCredentialsPrompter.prompt();
  return { username, password };
};

const deleteExistingAuthorization = async (authorizationPersister) => {
  try {
    await authorizationPersister.deleteExistingAuthorization();
  } catch (e) {
    const { twoFactorAuthenticationCode } = await handleCredentialError(e);
    await authorizationPersister
      .deleteExistingTwoFactorAuthorization(twoFactorAuthenticationCode);
  }
};

const saveNewAuthorization = async (authorizationPersister) => {
  try {
    await authorizationPersister.saveNewAuthorization();
  } catch (e) {
    const { twoFactorAuthenticationCode } = await handleCredentialError(e);
    await authorizationPersister.saveNewTwoFactorAuthorization(twoFactorAuthenticationCode);
  }
};

export {
  getLoginCredentials,
  deleteExistingAuthorization,
  saveNewAuthorization,
};
