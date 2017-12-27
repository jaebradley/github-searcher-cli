import * as LanguageSelector from './prompters/LanguageSelector';
import * as SearchTermPrompter from './prompters/SearchTermPrompter';
import * as IssueOptionSelector from './prompters/IssueOptionSelector';
import RepositorySelector from './prompters/RepositorySelector';

import { selectCodeQuery, selectIssueQuery } from './QuerySelector';

jest.mock('./prompters/RepositorySelector');

describe('QuerySelector', () => {
  describe('selectCodeQuery', () => {
    const queryString = 'queryString';
    const language = 'language';
    const organizationName = 'organizationName';
    const repositoryName = 'repositoryName';
    const selectedRepository = { organizationName, repositoryName };
    const searcher = {};
    const searchTerm = { queryString };
    const selectedLanguage = { language };
    const mockSelect = jest.fn();
    mockSelect.mockReturnValue(selectedRepository);
    RepositorySelector.mockImplementation(() => ({ select: mockSelect }));

    let promptSearchTermSpy;
    let languageSelectorSpy;

    beforeEach(() => {
      promptSearchTermSpy = jest.spyOn(SearchTermPrompter, 'promptSearchTerm').mockReturnValue(searchTerm);
      languageSelectorSpy = jest.spyOn(LanguageSelector, 'selectLanguage').mockReturnValue(selectedLanguage);
    });

    afterEach(() => {
      promptSearchTermSpy.mockRestore();
      languageSelectorSpy.mockRestore();
    });

    it('should select code query', async () => {
      const expected = {
        searchTerm: queryString,
        organizationName,
        repositoryName,
        language,
      };
      const queryParameters = await selectCodeQuery(searcher);

      expect(queryParameters).toEqual(expected);
      expect(RepositorySelector).toHaveBeenCalledTimes(1);
      expect(RepositorySelector).toHaveBeenCalledWith(searcher);
      expect(promptSearchTermSpy).toHaveBeenCalledTimes(1);
      expect(languageSelectorSpy).toHaveBeenCalledTimes(1);
      expect(mockSelect).toHaveBeenCalledTimes(1);
    });
  });

  describe('selectIssueQuery', () => {
    const quickOption = 'quickOption';
    const selectedIssueOption = { quickOption };

    let selectIssueOptionSpy;

    beforeEach(() => {
      selectIssueOptionSpy = jest.spyOn(IssueOptionSelector, 'selectIssueOption').mockReturnValue(selectedIssueOption);
    });

    afterEach(() => {
      selectIssueOptionSpy.mockRestore();
    });
    it('should select issue query', async () => {
      const option = await selectIssueQuery();
      expect(option).toEqual(selectedIssueOption);
      expect(selectIssueOptionSpy).toHaveBeenCalledTimes(1);
    });
  });
});
