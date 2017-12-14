import GitHub from 'github';

import IssueType from '../data/constants/IssueType';
import State from '../data/constants/State';

const formattedTypes = {};
formattedTypes[IssueType.PULL_REQUEST] = 'pr';
formattedTypes[IssueType.ISSUE] = 'issue';

const formattedStates = {};
formattedStates[State.OPEN] = 'open';
formattedStates[State.CLOSED] = 'closed';

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
      author,
      commenter,
      assignee,
      mentions,
      involves,
    } = searchTerms;

    const formattedType = formattedTypes[type];
    const formattedState = formattedStates[state];

    let formattedQuery = '';

    if (type) {
      formattedQuery += `type:${formattedType} `;
    }

    if (state) {
      formattedQuery += `state:${formattedState} `;
    }

    if (author) {
      formattedQuery += `author:${author}`;
    }

    if (commenter) {
      formattedQuery += `commenter:${commenter}`;
    }

    if (assignee) {
      formattedQuery += `assignee:${assignee}`;
    }

    if (mentions) {
      formattedQuery += `mentions:${mentions}`;
    }

    if (involves) {
      formattedQuery += `involves:${involves}`;
    }

    return formattedQuery;
  }
}

export default PullRequestSearchService;
