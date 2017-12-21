import inquirer from 'inquirer';
import { promptSearchTerm, isValidSearchTerm } from './SearchTermPrompter';

describe('Search Term Prompter', () => {
  describe('isValidSearchTerm', () => {
    it('should return false for undefined search term', () => {
      expect(isValidSearchTerm(undefined)).toBe(false);
    });

    it('should return false for empty string search term', () => {
      expect(isValidSearchTerm('')).toBe(false);
    });

    it('should return true for non-empty string search term', () => {
      expect(isValidSearchTerm('jaebaebae')).toBe(true);
    });
  });

  describe('promptSearchTerm', () => {
    let inquirerSpy;

    beforeEach(() => {
      inquirerSpy = jest.spyOn(inquirer, 'prompt').mockReturnValue('foobar');
    });

    afterEach(() => {
      inquirerSpy.mockRestore();
    });

    it('should return prompt', async () => {
      const expected = [
        {
          name: 'queryString',
          message: 'Input your search string',
          validate: isValidSearchTerm,
          type: 'input',
        },
      ];

      promptSearchTerm();

      expect(inquirer.prompt).toHaveBeenCalledTimes(1);
      expect(inquirer.prompt).toHaveBeenCalledWith(expected);
    });
  });
});
