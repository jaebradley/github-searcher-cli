import GitHub from 'github';
import * as SearchQueryBuilder from './SearchQueryBuilder';

import Searcher from './Searcher';

jest.mock('github');
jest.mock('./SearchQueryBuilder');

describe('Searcher', () => {
  const accessToken = 'accessToken';
  const options = 'options';
  const searchQuery = 'searchQuery';

  const mockAuthenticate = jest.fn();
  const mockSearchIssues = jest.fn();
  const mockSearchCode = jest.fn();
  const mockSearchRepositories = jest.fn();

  mockSearchIssues.mockReturnValue(Promise.resolve('issues'));
  mockSearchCode.mockReturnValue('code');
  mockSearchRepositories.mockReturnValue('repositories');

  GitHub.mockImplementation(() => ({
    authenticate: mockAuthenticate,
    search: {
      issues: mockSearchIssues,
      code: mockSearchCode,
      repos: mockSearchRepositories,
    },
  }));

  SearchQueryBuilder.buildSearchQuery = jest.fn();
  SearchQueryBuilder.buildSearchQuery.mockReturnValue(searchQuery);

  const clearMocks = () => {
    GitHub.mockClear();
    mockAuthenticate.mockClear();
    mockSearchIssues.mockClear();
    mockSearchCode.mockClear();
    mockSearchRepositories.mockClear();
    SearchQueryBuilder.buildSearchQuery.mockClear();
  };

  describe('constructor', () => {
    beforeEach(() => {
      clearMocks();
    });

    it('should create an instance', () => {
      const searcher = new Searcher(accessToken);
      expect(searcher).toBeDefined();
      expect(GitHub).toHaveBeenCalledTimes(1);
      expect(GitHub).toHaveBeenCalledWith({ headers: { Accept: 'application/vnd.github.v3.text-match+json' } });
      expect(mockAuthenticate).toHaveBeenCalledTimes(1);
      expect(mockAuthenticate).toHaveBeenCalledWith({ type: 'token', token: accessToken });
    });
  });

  describe('searchIssues', () => {
    beforeEach(() => {
      clearMocks();
    });

    const searcher = new Searcher(accessToken);

    it('should search issues', async () => {
      const results = await searcher.searchIssues(options);
      expect(results).toEqual('issues');
      expect(mockSearchIssues).toHaveBeenCalledTimes(1);
      expect(mockSearchIssues).toHaveBeenCalledWith({ q: searchQuery });
      expect(SearchQueryBuilder.buildSearchQuery).toHaveBeenCalledTimes(1);
      expect(SearchQueryBuilder.buildSearchQuery).toHaveBeenCalledWith(options);
    });
  });

  describe('searchCode', () => {
    beforeEach(() => {
      clearMocks();
    });

    const searcher = new Searcher(accessToken);

    it('should search code', async () => {
      const results = await searcher.searchCode(options);
      expect(results).toEqual('code');
      expect(mockSearchCode).toHaveBeenCalledTimes(1);
      expect(mockSearchCode).toHaveBeenCalledWith({ q: searchQuery });
      expect(SearchQueryBuilder.buildSearchQuery).toHaveBeenCalledTimes(1);
      expect(SearchQueryBuilder.buildSearchQuery).toHaveBeenCalledWith(options);
    });
  });

  describe('searchRepositories', () => {
    beforeEach(() => {
      clearMocks();
    });

    const searcher = new Searcher(accessToken);
    const organizationName = 'organizationName';
    const repositoryName = 'repositoryName';

    it('should search repositories with both organization name and repository name', async () => {
      const results = await searcher.searchRepositories(organizationName, repositoryName);
      expect(results).toEqual('repositories');
      expect(mockSearchRepositories).toHaveBeenCalledTimes(1);
      expect(mockSearchRepositories).toHaveBeenCalledWith({ q: `org:${organizationName} ${repositoryName}` });
    });

    it('should search repositories with only an organization name', async () => {
      const results = await searcher.searchRepositories(organizationName, null);
      expect(results).toEqual('repositories');
      expect(mockSearchRepositories).toHaveBeenCalledTimes(1);
      expect(mockSearchRepositories).toHaveBeenCalledWith({ q: `org:${organizationName} ` });
    });

    it('should throw when organization name is null', async () => {
      try {
        await searcher.searchRepositories(null, repositoryName);
      } catch (e) {
        expect(e).toEqual(new Error('Organization name must be defined when searching repositories'));
        expect(mockSearchRepositories).not.toHaveBeenCalled();
      }
    });
  });
});
