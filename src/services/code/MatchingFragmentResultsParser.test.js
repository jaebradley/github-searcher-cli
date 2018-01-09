import { parseResults } from './MatchingFragmentResultsParser';

describe('MatchingFragmentResultsParser', () => {
  describe('parseResults', () => {
    const results = {
      data: {
        items: [
          {
            name: 'firstName',
            path: 'firstPath',
            html_url: 'firstURL',
            repository: { full_name: 'firstRepositoryName' },
            text_matches: [
              {
                fragment: 'firstFragment',
                matches: [{ indices: ['foo', 'fucking', 'bar'] }, { indices: ['bar', 'bucking', 'foo'] }],
              },
              {
                fragment: 'secondFragment',
                matches: [{ indices: ['bar', 'bucking', 'foo'] }],
              },
            ],
          },
          {
            name: 'secondName',
            path: 'secondPath',
            html_url: 'secondURL',
            repository: { full_name: 'secondRepositoryName' },
            text_matches: [
              {
                fragment: 'firstFragment',
                matches: [{ indices: ['foo', 'fucking', 'bar'] }, { indices: ['bar', 'bucking', 'foo'] }],
              },
              {
                fragment: 'secondFragment',
                matches: [{ indices: ['bar', 'bucking', 'foo'] }],
              },
            ],
          },
        ],
      },
    };
    const expected = [
      {
        fullRepositoryName: 'firstRepositoryName',
        matchingFragments: [
          {
            text: 'firstFragment',
            matchingRanges: [
              {
                start: 'foo',
                end: 'fucking',
              },
              {
                start: 'bar',
                end: 'bucking',
              },
            ],
          },
          {
            text: 'secondFragment',
            matchingRanges: [
              {
                start: 'bar',
                end: 'bucking',
              },
            ],
          },
        ],
        browserURL: 'firstURL',
        name: 'firstName',
        path: 'firstPath',
      },
      {
        fullRepositoryName: 'secondRepositoryName',
        matchingFragments: [
          {
            text: 'firstFragment',
            matchingRanges: [
              {
                start: 'foo',
                end: 'fucking',
              },
              {
                start: 'bar',
                end: 'bucking',
              },
            ],
          },
          {
            text: 'secondFragment',
            matchingRanges: [
              {
                start: 'bar',
                end: 'bucking',
              },
            ],
          },
        ],
        browserURL: 'secondURL',
        name: 'secondName',
        path: 'secondPath',
      },
    ];
    it('should parse results', () => {
      expect(expected).toEqual(parseResults(results));
    });
  });
});
