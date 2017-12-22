import inquirer from 'inquirer';
import {
  Authored,
  Commented,
  Assigned,
  Mentioned,
  Involved,
} from '../../data/constants/github/issue/UserActions';
import { isValidUsername, selectUserIssueActions } from './UserIssueActionSelector';

describe('UserIssueActionSelector', () => {
  describe('isValidUsername', () => {
    it('should return false for undefined answers', () => {
      expect(isValidUsername(undefined)).toBe(false);
    });

    it('should return false for undefined username', () => {
      expect(isValidUsername({ username: undefined }));
    });

    it('should return false for empty string username', () => {
      expect(isValidUsername({ username: '' }));
    });

    it('should return true for non-empty string username', () => {
      expect(isValidUsername({ username: 'jaebaebae' }));
    });
  });

  describe('selectUserIssueActions', () => {
    let inquirerSpy;

    beforeEach(() => {
      inquirerSpy = jest.spyOn(inquirer, 'prompt').mockReturnValue('foobar');
    });

    afterEach(() => {
      inquirerSpy.mockRestore();
    });

    it('should return user issue action prompts', () => {
      const expected = [
        {
          type: 'input',
          name: 'username',
          message: 'Filter by issue action (authored, committed, etc.) by inputting a username',
        },
        {
          type: 'checkbox',
          name: 'actions',
          message: 'Select issue action',
          when: isValidUsername,
          choices: [
            Authored,
            Commented,
            Assigned,
            Mentioned,
            Involved,
          ],
        },
      ];

      expect(selectUserIssueActions()).resolves.toEqual('foobar');

      expect(inquirerSpy).toHaveBeenCalledTimes(1);
      expect(inquirerSpy).toHaveBeenCalledWith(expected);
    });
  });
});
