import {
  Authored,
  Commented,
  Assigned,
  Mentioned,
  Involved,
} from '../data/constants/github/issue/UserActions';
import { Issue, PullRequest } from '../data/constants/github/issue/Type';
import { Open, Closed } from '../data/constants/github/issue/State';
import {
  HasNotBeenReviewed,
  Required,
  Approved,
  ChangesRequested,
} from '../data/constants/prompts/pullRequest/ReviewStatus';


const buildIssueActionsQuery = (username, actions) => {
  if (!username || !actions) {
    return '';
  }

  let query = '';

  if (actions.includes(Authored)) {
    query += `author:${username} `;
  }

  if (actions.includes(Commented)) {
    query += `commenter:${username} `;
  }
  if (actions.includes(Assigned)) {
    query += `assignee:${username} `;
  }

  if (actions.includes(Mentioned)) {
    query += `mentions:${username}`;
  }

  if (actions.includes(Involved)) {
    query += `involves:${username}`;
  }

  return query.trim();
};

const getFormattedType = (type) => {
  switch (type) {
    case PullRequest:
      return 'pr';
    case Issue:
      return 'issue';
    default:
      throw new Error(`Unknown type: ${type}`);
  }
};

const getFormattedState = (state) => {
  switch (state) {
    case Open:
      return 'open';
    case Closed:
      return 'closed';
    default:
      throw new Error(`Unknown state: ${state}`);
  }
};

const getFormattedReviewStatus = (status) => {
  switch (status) {
    case HasNotBeenReviewed:
      return 'none';
    case Required:
      return 'required';
    case Approved:
      return 'approved';
    case ChangesRequested:
      return 'changes_requested';
    default:
      throw new Error(`Unknown review status: ${status}`);
  }
};

const buildSearchQuery = ({
  searchTerm,
  organizationName,
  repositoryName,
  type,
  state,
  language,
  reviewStatus,
  // TODO: @jaebradley considering combining these two properties together
  // in an object
  issueActionUsername,
  issueActions,
}) => {
  let query = '';

  if (searchTerm) {
    query += `${searchTerm} `;
  }

  if (organizationName) {
    if (repositoryName && repositoryName !== 'None') {
      query += `repo:${organizationName}/${repositoryName} `;
    } else {
      query += `org:${organizationName} `;
    }
  }

  if (language && language !== 'None') {
    query += `language:${language} `;
  }

  if (type) {
    query += `type:${getFormattedType(type)} `;
  }

  if (state) {
    query += `state:${getFormattedState(state)} `;
  }

  if (reviewStatus) {
    query += `review:${getFormattedReviewStatus(reviewStatus)} `;
  }

  query += buildIssueActionsQuery(issueActionUsername, issueActions);

  return query.trim();
};

export {
  buildIssueActionsQuery,
  getFormattedType,
  getFormattedState,
  getFormattedReviewStatus,
  buildSearchQuery,
};
