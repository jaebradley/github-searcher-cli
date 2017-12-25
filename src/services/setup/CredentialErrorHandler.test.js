import { TwoFactorAuthenticationRequiredErrorMessage } from '../../data/constants/github/Errors';
import * as TwoFactorAuthenticationCodePrompter from '../prompters/TwoFactorAuthenticationCodePrompter';
import { RemoveExistingTwoFactorAuthenticationMessage } from '../../data/constants/setup/Message';
import { isTwoFactorAuthenticationError, handleCredentialError } from './CredentialErrorHandler';

describe('CredentialErrorHandler', () => {
  const error = new Error(JSON.stringify({ message: 'foobar' }));
  const twoFactorAuthenticationError = new Error(JSON.stringify({
    message: TwoFactorAuthenticationRequiredErrorMessage,
  }));

  describe('isTwoFactorAuthenticationError', () => {
    it('should return false for undefined error', () => {
      expect(isTwoFactorAuthenticationError(undefined)).toBe(false);
    });

    it('should return false for error without message property', () => {
      expect(isTwoFactorAuthenticationError({})).toBe(false);
    });

    it('should return false for error with invalid JSONified message message property', () => {
      expect(isTwoFactorAuthenticationError(error)).toBe(false);
    });

    it('should return true for error with valid JSONified message message property', () => {
      expect(isTwoFactorAuthenticationError(twoFactorAuthenticationError)).toBe(true);
    });
  });

  describe('handleCredentialError', () => {
    const code = 'foobar';
    let spy;

    beforeEach(() => {
      spy = jest.spyOn(TwoFactorAuthenticationCodePrompter, 'promptTwoFactorAuthenticationCode').mockReturnValue({ twoFactorAuthenticationCode: code });
    });

    afterEach(() => {
      spy.mockRestore();
    });

    it('should throw error for non two factor authentication error', async () => {
      try {
        await handleCredentialError(error);
      } catch (e) {
        expect(e).toEqual(error);
      }
    });

    it('should prompt for two factor authentication code if two factor authentication error', async () => {
      const {
        twoFactorAuthenticationCode,
      } = await handleCredentialError(twoFactorAuthenticationError);
      expect(twoFactorAuthenticationCode).toEqual('foobar');
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(RemoveExistingTwoFactorAuthenticationMessage);
    });
  });
});
