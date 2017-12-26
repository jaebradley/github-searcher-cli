import { TwoFactorAuthenticationRequiredErrorMessage } from '../../data/constants/github/Errors';
import { promptTwoFactorAuthenticationCode } from '../prompters/TwoFactorAuthenticationCodePrompter';
import { InputTwoFactorAuthentication } from '../../data/constants/setup/Message';

const isTwoFactorAuthenticationError = error => (
  !!error
    && !!error.message
    && JSON.parse(error.message).message === TwoFactorAuthenticationRequiredErrorMessage
);

const handleCredentialError = async (error) => {
  if (!isTwoFactorAuthenticationError(error)) {
    throw error;
  }

  const {
    twoFactorAuthenticationCode,
  } = await promptTwoFactorAuthenticationCode(InputTwoFactorAuthentication);
  return { twoFactorAuthenticationCode };
};

export {
  handleCredentialError,
  isTwoFactorAuthenticationError,
};
