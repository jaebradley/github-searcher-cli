import inquirer from 'inquirer';
import fuzzy from 'fuzzy';

import {
  None,
  HasNotBeenReviewed,
  Required,
  Approved,
  ChangesRequested,
} from '../../data/constants/prompts/pullRequest/ReviewStatus';

import { selectReviewStatus, filterReviewStatuses } from './ReviewStatusSelector';

describe('ReviewStatusSelector', () => {
  const choices = [
    None,
    HasNotBeenReviewed,
    Required,
    Approved,
    ChangesRequested,
  ];

  const matches = [
    { original: 'foo' },
    { original: 'bar' },
    { original: 'baz' },
  ];
  const expectedMatches = ['foo', 'bar', 'baz'];

  describe('filterReviewStatuses', () => {
    let spy;

    beforeEach(() => {
      spy = jest.spyOn(fuzzy, 'filter').mockReturnValue(matches);
    });

    afterEach(() => {
      spy.mockRestore();
    });

    it('should return matches for undefined input', () => {
      expect(filterReviewStatuses(undefined, undefined)).resolves.toEqual(expectedMatches);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith('', choices);
    });

    it('should return matches for defined input', () => {
      expect(filterReviewStatuses(undefined, 'jaebaebae')).resolves.toEqual(expectedMatches);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith('jaebaebae', choices);
    });
  });

  describe('selectReviewStatus', () => {
    let spy;

    beforeEach(() => {
      spy = jest.spyOn(inquirer, 'prompt').mockReturnValue('foobar');
    });

    afterEach(() => {
      spy.mockRestore();
    });

    it('should return prompt', () => {
      expect(selectReviewStatus()).resolves.toEqual('foobar');
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith([
        {
          type: 'autocomplete',
          name: 'reviewStatus',
          message: 'Choose a review status',
          source: filterReviewStatuses,
        },
      ]);
    });
  });
});
