import inquirer from 'inquirer';
import fuzzy from 'fuzzy';

import {
  NONE,
  OPEN_PULL_REQUESTS_THAT_USER_HAS_AUTHORED,
  OPEN_PULL_REQUESTS_THAT_USER_HAS_COMMENTED_ON,
  OPEN_PULL_REQUESTS_THAT_USER_HAS_BEEN_ASSIGNED_TO,
  OPEN_PULL_REQUESTS_THAT_USER_HAS_BEEN_MENTIONED_ON,
  OPEN_PULL_REQUESTS_THAT_USER_HAS_BEEN_INVOLVED_WITH,
  CLOSED_PULL_REQUESTS_THAT_USE_HAS_AUTHORED,
  CLOSED_PULL_REQUESTS_THAT_USER_HAS_COMMENTED_ON,
  CLOSED_PULL_REQUESTS_THAT_USER_HAS_BEEN_ASSIGNED_TO,
  CLOSED_PULL_REQUESTS_THAT_USER_HAS_BEEN_MENTIONED_ON,
  CLOSED_PULL_REQUESTS_THAT_USER_HAS_BEEN_INVOLVED_WITH,
} from '../../data/constants/prompts/pullRequest/Options';

import { filterOptions, selectPullRequestOption } from './PullRequestOptionSelector';

const OPTIONS = [
  NONE,
  OPEN_PULL_REQUESTS_THAT_USER_HAS_AUTHORED,
  OPEN_PULL_REQUESTS_THAT_USER_HAS_COMMENTED_ON,
  OPEN_PULL_REQUESTS_THAT_USER_HAS_BEEN_ASSIGNED_TO,
  OPEN_PULL_REQUESTS_THAT_USER_HAS_BEEN_MENTIONED_ON,
  OPEN_PULL_REQUESTS_THAT_USER_HAS_BEEN_INVOLVED_WITH,
  CLOSED_PULL_REQUESTS_THAT_USE_HAS_AUTHORED,
  CLOSED_PULL_REQUESTS_THAT_USER_HAS_COMMENTED_ON,
  CLOSED_PULL_REQUESTS_THAT_USER_HAS_BEEN_ASSIGNED_TO,
  CLOSED_PULL_REQUESTS_THAT_USER_HAS_BEEN_MENTIONED_ON,
  CLOSED_PULL_REQUESTS_THAT_USER_HAS_BEEN_INVOLVED_WITH,
];

describe('PullRequestOptionSelector', () => {
  describe('filterOptions', () => {
    const matches = [
      { original: 'foo' },
      { original: 'fucking' },
      { original: 'bar' },
    ];
    const expected = ['foo', 'fucking', 'bar'];

    let fuzzySpy;

    beforeEach(() => {
      fuzzySpy = jest.spyOn(fuzzy, 'filter').mockReturnValue(matches);
    });

    afterEach(() => {
      fuzzySpy.mockRestore();
    });

    it('should filter options with defined input', () => {
      expect(filterOptions('jaebaebae', 'some option')).resolves.toEqual(expected);
      expect(fuzzySpy).toHaveBeenCalledTimes(1);
      expect(fuzzySpy).toHaveBeenCalledWith('some option', OPTIONS);
    });

    it('should filter options with undefined input', () => {
      expect(filterOptions('jaebaebae', undefined)).resolves.toEqual(expected);
      expect(fuzzySpy).toHaveBeenCalledTimes(1);
      expect(fuzzySpy).toHaveBeenCalledWith('', OPTIONS);
    });
  });

  describe('selectPullRequestOption', () => {
    const value = 'value';
    let inquirerSpy;

    beforeEach(() => {
      inquirerSpy = jest.spyOn(inquirer, 'prompt').mockReturnValue(value);
    });

    afterEach(() => {
      inquirerSpy.mockRestore();
    });

    it('should prompt for pull request option', async () => {
      const option = await selectPullRequestOption();
      expect(option).toEqual(value);
      expect(inquirerSpy).toHaveBeenCalledTimes(1);
      expect(inquirerSpy).toHaveBeenCalledWith([
        {
          name: 'quickOption',
          message: 'Select an option',
          type: 'autocomplete',
          source: filterOptions,
        },
      ]);
    });
  });
})
