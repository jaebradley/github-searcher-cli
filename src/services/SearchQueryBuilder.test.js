import { Issue, PullRequest } from '../data/constants/github/issue/Type';
import { Open, Closed } from '../data/constants/github/issue/State';
import {
  HasNotBeenReviewed,
  Required,
  Approved,
  ChangesRequested,
} from '../data/constants/prompts/pullRequest/ReviewStatus';
import {
  Authored,
  Commented,
  Assigned,
  Mentioned,
  Involved,
} from '../data/constants/github/issue/UserActions';

import {
  getFormattedType,
  getFormattedState,
  getFormattedReviewStatus,
  buildIssueActionsQuery,
  buildSearchQuery,
} from './SearchQueryBuilder';

describe('SearchQueryBuilder', () => {
  describe('getFormattedType', () => {
    it('should return pull request type', () => {
      expect(getFormattedType(PullRequest)).toEqual('pr');
    });

    it('should return issue type', () => {
      expect(getFormattedType(Issue)).toEqual('issue');
    });

    it('should throw an error for an unknown type', () => {
      expect(() => getFormattedType('foobar')).toThrow(Error);
      expect(() => getFormattedType('foobar')).toThrowError('Unknown type: foobar');
    });
  });

  describe('getFormattedState', () => {
    it('should return open state', () => {
      expect(getFormattedState(Open)).toEqual('open');
    });

    it('should return closed state', () => {
      expect(getFormattedState(Closed)).toEqual('closed');
    });

    it('should throw an error for an unknown state', () => {
      expect(() => getFormattedState('foobar')).toThrow(Error);
      expect(() => getFormattedState('foobar')).toThrowError('Unknown state: foobar');
    });
  });

  describe('getFormattedReviewStatus', () => {
    it('should return has not been reviewed status', () => {
      expect(getFormattedReviewStatus(HasNotBeenReviewed)).toEqual('none');
    });

    it('should return required status', () => {
      expect(getFormattedReviewStatus(Required)).toEqual('required');
    });

    it('should return approved status', () => {
      expect(getFormattedReviewStatus(Approved)).toEqual('approved');
    });

    it('should return changes requested status', () => {
      expect(getFormattedReviewStatus(ChangesRequested)).toEqual('changes_requested');
    });

    it('should throw an error for unknown status', () => {
      expect(() => getFormattedReviewStatus('foobar')).toThrow(Error);
      expect(() => getFormattedReviewStatus('foobar')).toThrowError('Unknown review status: foobar');
    });
  });

  describe('buildIssueActionsQuery', () => {
    const username = 'jaebaebae';
    it('should return empty string for undefined username', () => {
      expect(buildIssueActionsQuery(undefined, [])).toEqual('');
    });

    it('should return empty string for undefined actions', () => {
      expect(buildIssueActionsQuery(username, undefined)).toEqual('');
    });

    it('should return empty string for empty array of actions', () => {
      expect(buildIssueActionsQuery(username, [])).toEqual('');
    });

    it('should return author string for authored action', () => {
      expect(buildIssueActionsQuery(username, [Authored])).toEqual(`author:${username}`);
    });

    it('should return commenter string for commented action', () => {
      expect(buildIssueActionsQuery(username, [Commented])).toEqual(`commenter:${username}`);
    });

    it('should return assignee string for assigned action', () => {
      expect(buildIssueActionsQuery(username, [Assigned])).toEqual(`assignee:${username}`);
    });

    it('should return mentions string for mentioned action', () => {
      expect(buildIssueActionsQuery(username, [Mentioned])).toEqual(`mentions:${username}`);
    });

    it('should return involves string for involved action', () => {
      expect(buildIssueActionsQuery(username, [Involved])).toEqual(`involves:${username}`);
    });
  });

  describe('buildSearchQuery', () => {
    const searchTerm = 'searchTerm';
    const organizationName = 'organizationName';
    const repositoryName = 'repositoryName';
    const type = PullRequest;
    const state = Open;
    const language = 'language';
    const reviewStatus = Required;
    const issueActionUsername = 'jaebaebae';
    const issueActions = [Authored];

    it('should return empty string for empty input', () => {
      expect(buildSearchQuery({})).toEqual('');
    });

    it('should return search term for non-empty search term', () => {
      expect(buildSearchQuery({ searchTerm })).toEqual(searchTerm);
    });

    it('should return organization name when organization name is provided but repository name is not', () => {
      expect(buildSearchQuery({ organizationName })).toEqual(`org:${organizationName}`);
    });

    it('should return organization and repo name when both are provided', () => {
      expect(buildSearchQuery({ organizationName, repositoryName })).toEqual(`repo:${organizationName}/${repositoryName}`);
    });

    it('should return language when provided and not None', () => {
      expect(buildSearchQuery({ language })).toEqual(`language:${language}`);
    });

    it('should not return language when it is None', () => {
      expect(buildSearchQuery({ language: 'None' })).toEqual('');
    });

    it('should return type', () => {
      expect(buildSearchQuery({ type })).toEqual('type:pr');
    });

    it('should return state', () => {
      expect(buildSearchQuery({ state })).toEqual('state:open');
    });

    it('should return review status', () => {
      expect(buildSearchQuery({ reviewStatus })).toEqual('review:required');
    });

    it('should return issue actions', () => {
      expect(buildSearchQuery({ issueActionUsername, issueActions })).toEqual('author:jaebaebae');
    });
  });
});
