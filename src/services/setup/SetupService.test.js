import LoginCredentialsPrompter from '../prompters/LoginCredentialsPrompter';
import UserService from '../UserService';
import {
  getLoginCredentials,
  deleteExistingAuthorization,
  saveNewAuthorization,
} from './SetupService';
import * as CredentialErrorHandler from './CredentialErrorHandler';

jest.mock('../prompters/LoginCredentialsPrompter');
jest.mock('../UserService');

describe('SetupService', () => {
  describe('getLoginCredentials', () => {
    const username = 'username';
    const password = 'password';
    const value = { username, password };
    const mockPrompt = jest.fn();
    mockPrompt.mockReturnValue(value);
    LoginCredentialsPrompter.mockImplementation(() => ({ prompt: mockPrompt }));

    it('should return username and password', async () => {
      const credentials = await getLoginCredentials();
      expect(UserService).toHaveBeenCalled();
      expect(credentials.username).toEqual(username);
      expect(credentials.password).toEqual(password);
      expect(mockPrompt).toHaveBeenCalledTimes(1);
    });
  });

  describe('deleteExistingAuthorization', () => {
    const error = new Error('foobar');
    const mockDeleteExistingAuthorization = jest.fn().mockImplementation(() => {});
    const mockDeleteExistingAuthorizationThrows = jest.fn()
      .mockImplementation(() => { throw error; });
    const mockDeleteExisting2FAAuthorization = jest.fn().mockImplementation(() => {});
    const authorizationPersister = {
      deleteExistingAuthorization: mockDeleteExistingAuthorization,
      deleteExistingTwoFactorAuthorization: mockDeleteExisting2FAAuthorization,
    };
    const twoFactorAuthorizationPersister = {
      deleteExistingAuthorization: mockDeleteExistingAuthorizationThrows,
      deleteExistingTwoFactorAuthorization: mockDeleteExisting2FAAuthorization,
    };
    const code = 'code';

    let handleCredentialErrorSpy;

    beforeEach(() => {
      handleCredentialErrorSpy = jest.spyOn(CredentialErrorHandler, 'handleCredentialError').mockReturnValue({ twoFactorAuthenticationCode: code });
    });

    afterEach(() => {
      handleCredentialErrorSpy.mockRestore();
    });

    it('should delete existing non-2FA authorization', async () => {
      await deleteExistingAuthorization(authorizationPersister);
      expect(mockDeleteExistingAuthorization).toHaveBeenCalledTimes(1);
      expect(mockDeleteExisting2FAAuthorization).toHaveBeenCalledTimes(0);
      expect(handleCredentialErrorSpy).toHaveBeenCalledTimes(0);
    });

    it('should delete existing 2FA authorization', async () => {
      await deleteExistingAuthorization(twoFactorAuthorizationPersister);
      expect(mockDeleteExistingAuthorization).toHaveBeenCalledTimes(1);
      expect(mockDeleteExisting2FAAuthorization).toHaveBeenCalledTimes(1);
      expect(handleCredentialErrorSpy).toHaveBeenCalledTimes(1);
      expect(handleCredentialErrorSpy).toHaveBeenCalledWith(error);
    });
  });

  describe('saveNewAuthorization', () => {
    const error = new Error('foobar');
    const mockSaveExistingAuthorization = jest.fn().mockImplementation(() => {});
    const mockSaveExistingAuthorizationThrows = jest.fn()
      .mockImplementation(() => { throw error; });
    const mockSaveExisting2FAAuthorization = jest.fn().mockImplementation(() => {});
    const authorizationPersister = {
      saveNewAuthorization: mockSaveExistingAuthorization,
      saveNewTwoFactorAuthorization: mockSaveExisting2FAAuthorization,
    };
    const twoFactorAuthorizationPersister = {
      saveNewAuthorization: mockSaveExistingAuthorizationThrows,
      saveNewTwoFactorAuthorization: mockSaveExisting2FAAuthorization,
    };
    const code = 'code';

    let handleCredentialErrorSpy;

    beforeEach(() => {
      handleCredentialErrorSpy = jest.spyOn(CredentialErrorHandler, 'handleCredentialError').mockReturnValue({ twoFactorAuthenticationCode: code });
    });

    afterEach(() => {
      handleCredentialErrorSpy.mockRestore();
    });

    it('should save existing non-2FA authorization', async () => {
      await saveNewAuthorization(authorizationPersister);
      expect(mockSaveExistingAuthorization).toHaveBeenCalledTimes(1);
      expect(mockSaveExisting2FAAuthorization).toHaveBeenCalledTimes(0);
      expect(handleCredentialErrorSpy).toHaveBeenCalledTimes(0);
    });

    it('should save existing 2FA authorization', async () => {
      await saveNewAuthorization(twoFactorAuthorizationPersister);
      expect(mockSaveExistingAuthorization).toHaveBeenCalledTimes(1);
      expect(mockSaveExisting2FAAuthorization).toHaveBeenCalledTimes(1);
      expect(handleCredentialErrorSpy).toHaveBeenCalledTimes(1);
      expect(handleCredentialErrorSpy).toHaveBeenCalledWith(error);
    });
  });
});
