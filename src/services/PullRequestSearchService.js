import GitHub from 'github';

import IssueType from '../data/constants/IssueType';
import State from '../data/constants/State';
import {
  HasNotBeenReviewed,
  Required,
  Approved,
  ChangesRequested,
} from '../data/constants/prompts/pullRequest/ReviewStatus';

const formattedTypes = {};
formattedTypes[IssueType.PULL_REQUEST] = 'pr';
formattedTypes[IssueType.ISSUE] = 'issue';

const formattedStates = {};
formattedStates[State.OPEN] = 'open';
formattedStates[State.CLOSED] = 'closed';

const reviewStatuses = {};
reviewStatuses[HasNotBeenReviewed] = 'none';
reviewStatuses[Required] = 'required';
reviewStatuses[Approved] = 'approved';
reviewStatuses[ChangesRequested] = 'changes_requested';

class PullRequestSearchService {
  constructor(accessToken) {
    this.client = GitHub();
    this.client.authenticate({
      type: 'token',
      token: accessToken,
    });
  }

  async search(searchTerms) {
    const formattedSearchTerms = PullRequestSearchService.getFormattedSearchTerms(searchTerms);
    return this.client.search.issues({ q: formattedSearchTerms });
  }

  static getFormattedSearchTerms(searchTerms) {
    const {
      type,
      state,
      reviewStatus,
      author,
      commenter,
      assignee,
      mentions,
      involves,
      organizationName,
      repositoryName,
      language,
      queryString,
    } = searchTerms;

    const formattedType = formattedTypes[type];
    const formattedState = formattedStates[state];

    let formattedQuery = '';

    if (queryString) {
      formattedQuery += `${queryString} `;
    }

    let repositoryQuery = '';
    if (organizationName) {
      if (repositoryName && repositoryName !== 'None') {
        repositoryQuery += `repo:${organizationName}/${repositoryName} `;
      } else {
        repositoryQuery += `org:${organizationName} `;
      }
    }

    formattedQuery += `${repositoryQuery}`;

    if (language && language !== 'None') {
      formattedQuery += `language:${language} `;
    }

    if (type) {
      formattedQuery += `type:${formattedType} `;
    }

    if (state) {
      formattedQuery += `state:${formattedState} `;
    }

    const reviewStatusValue = reviewStatuses[reviewStatus];
    if (reviewStatusValue) {
      formattedQuery += `review:${reviewStatusValue} `;
    }

    if (author) {
      formattedQuery += `author:${author} `;
    }

    if (commenter) {
      formattedQuery += `commenter:${commenter} `;
    }

    if (assignee) {
      formattedQuery += `assignee:${assignee} `;
    }

    if (mentions) {
      formattedQuery += `mentions:${mentions} `;
    }

    if (involves) {
      formattedQuery += `involves:${involves} `;
    }

    return formattedQuery;
  }
}

export default PullRequestSearchService;
