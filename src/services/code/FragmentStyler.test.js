import { styleFragment } from './FragmentStyler';

describe('FragmentStyler', () => {
  describe('styleFragment', () => {
    it('should return style fragment', () => {
      const filePath = 'filePath';
      const repositoryName = 'repositoryName';
      const text = 'jaebaebae baejadley';
      const matchingRanges = [
        {
          start: 0,
          end: 1,
        },
        {
          start: 3,
          end: 6,
        },
      ];
      const fragment = { matchingRanges, text };
      const expected = '\u001b[35m\u001b[1mfilePath\u001b[22m\u001b[39m in \u001b[1m\u001b[33mrepositoryName\u001b[39m\u001b[22m\n\u001b[1m\u001b[31mj\u001b[39m\u001b[22m\u001b[1m\u001b[31ma\u001b[39m\u001b[22me\u001b[1m\u001b[31mb\u001b[39m\u001b[22m\u001b[1m\u001b[31ma\u001b[39m\u001b[22m\u001b[1m\u001b[31me\u001b[39m\u001b[22m\u001b[1m\u001b[31mb\u001b[39m\u001b[22mae baejadley';
      expect(expected).toEqual(styleFragment({ filePath, repositoryName, fragment }));
    });
  });
});
