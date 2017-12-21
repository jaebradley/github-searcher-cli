import inquirer from 'inquirer';

import { validateAuthenticationCode, promptTwoFactorAuthenticationCode } from './TwoFactorAuthenticationCodePrompter';

describe('TwoFactorAuthenticationCodePrompter', () => {
  describe('validateAuthenticationCode', () => {
    it('should return false for an undefined code', () => {
      expect(validateAuthenticationCode(undefined)).toBe(false);
    });

    it('should return false for an empty string code', () => {
      expect(validateAuthenticationCode('')).toBe(false);
    });

    it('should return true for a non-empty string code', () => {
      expect(validateAuthenticationCode('jaebaebae')).toBe(true);
    });
  });

  describe('promptTwoFactorAuthenticationCode', () => {
    let inquirerSpy;

    beforeEach(() => {
      inquirerSpy = jest.spyOn(inquirer, 'prompt').mockReturnValue('foobar');
    });

    afterEach(() => {
      inquirerSpy.mockRestore();
    });

    it('should return prompt', () => {
      const expected = [
        {
          name: 'twoFactorAuthenticationCode',
          validate: validateAuthenticationCode,
          type: 'password',
          message: 'Enter your two factor authentication code',
        },
      ];
      expect(promptTwoFactorAuthenticationCode()).resolves.toEqual('foobar');
      expect(inquirerSpy).toHaveBeenCalledTimes(1);
      expect(inquirerSpy).toHaveBeenCalledWith(expected);
    });
  });
});
