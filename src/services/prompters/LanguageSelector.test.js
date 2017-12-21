import fuzzy from 'fuzzy';
import inquirer from 'inquirer';
import { selectLanguage, findMatches, applyFiltering } from './LanguageSelector';
import GitHubLanguages from '../../data/constants/github/Languages';

describe('Languages Selector', () => {
  describe('findMatches', () => {
    describe('unit tests', () => {
      const matches = [
        { original: 'foo' },
        { original: 'bar' },
        { original: 'baz' },
      ];
      let spy;

      beforeEach(() => {
        spy = jest.spyOn(fuzzy, 'filter').mockReturnValue(matches);
      });

      afterEach(() => {
        spy.mockRestore();
      });

      it('should filter terms', () => {
        const expected = ['foo', 'bar', 'baz'];


        fuzzy.filter.mockReturnValue(matches);
        const results = findMatches('jaebaebae');
        expect(results).toEqual(expected);
        expect(fuzzy.filter).toHaveBeenCalledTimes(1);
        expect(fuzzy.filter).toHaveBeenCalledWith('jaebaebae', GitHubLanguages);
      });
    });

    describe('integration tests', () => {
      it('should filter terms', () => {
        const expected = ['Java', 'Java Server Pages', 'JavaScript'];
        const results = findMatches('java');
        expect(results).toEqual(expected);
      });
    });
  });

  describe('applyFiltering', () => {
    describe('integration tests', () => {
      it('should filter terms', () => {
        const expected = ['Java', 'Java Server Pages', 'JavaScript'];
        expect(applyFiltering({}, 'java')).resolves.toEqual(expected);
      });
    });
  });

  describe('selectLanguage', () => {
    describe('unit tests', () => {
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
            name: 'language',
            message: 'Choose optional language',
            type: 'autocomplete',
            source: applyFiltering,
          },
        ];

        selectLanguage();

        expect(inquirer.prompt).toHaveBeenCalledTimes(1);
        expect(inquirer.prompt).toHaveBeenCalledWith(expected);
      });
    });
  });
});
