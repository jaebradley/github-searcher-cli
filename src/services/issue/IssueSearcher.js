import GitHub from 'github';

import { Issue, PullRequest } from '../../data/constants/github/issue/Type';
import State from '../../data/constants/State';

const formattedTypes = {};
formattedTypes[PullRequest] = 'pr';
formattedTypes[Issue] = 'issue';

const formattedStates = {};
formattedStates[State.OPEN] = 'open';
formattedStates[State.CLOSED] = 'closed';

class IssueSearcher {
  constructor(accessToken) {
    this.client = GitHub();
    this.client.authenticate({
      type: 'token',
      token: accessToken,
    });
  }

  async search(searchTerms) {
    const formattedSearchTerms = IssueSearcher.getFormattedSearchTerms(searchTerms);
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

export default IssueSearcher;
