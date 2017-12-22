import { Issue, PullRequest } from '../data/constants/github/issue/Type';
import { Open, Closed } from '../data/constants/github/issue/State';

import {
  NONE,
  OPEN_PULL_REQUESTS_THAT_USER_HAS_AUTHORED,
  OPEN_PULL_REQUESTS_THAT_USER_HAS_COMMENTED_ON,
  OPEN_PULL_REQUESTS_THAT_USER_HAS_BEEN_ASSIGNED_TO,
  OPEN_PULL_REQUESTS_THAT_USER_HAS_BEEN_MENTIONED_ON,
  OPEN_PULL_REQUESTS_THAT_USER_HAS_BEEN_INVOLVED_WITH,
  CLOSED_PULL_REQUESTS_THAT_USE_HAS_AUTHORED,
  CLOSED_PULL_REQUESTS_THAT_USER_HAS_COMMENTED_ON,
  CLOSED_PULL_REQUESTS_THAT_USER_HAS_BEEN_ASSIGNED_TO,
  CLOSED_PULL_REQUESTS_THAT_USER_HAS_BEEN_MENTIONED_ON,
  CLOSED_PULL_REQUESTS_THAT_USER_HAS_BEEN_INVOLVED_WITH,
} from '../data/constants/prompts/pullRequest/Options';

import {
  OPEN_ISSUES_THAT_USER_HAS_AUTHORED,
  OPEN_ISSUES_THAT_USER_HAS_COMMENTED_ON,
  OPEN_ISSUES_THAT_USER_HAS_BEEN_ASSIGNED_TO,
  OPEN_ISSUES_THAT_USER_HAS_BEEN_MENTIONED_ON,
  OPEN_ISSUES_THAT_USER_HAS_BEEN_INVOLVED_WITH,
  CLOSED_ISSUES_THAT_USE_HAS_AUTHORED,
  CLOSED_ISSUES_THAT_USER_HAS_COMMENTED_ON,
  CLOSED_ISSUES_THAT_USER_HAS_BEEN_ASSIGNED_TO,
  CLOSED_ISSUES_THAT_USER_HAS_BEEN_MENTIONED_ON,
  CLOSED_ISSUES_THAT_USER_HAS_BEEN_INVOLVED_WITH,
} from '../data/constants/prompts/issue/Options';

import {
  Authored,
  Commented,
  Assigned,
  Mentioned,
  Involved,
} from '../data/constants/github/issue/UserActions';


const buildSearchTermsFromOption = (option, username) => {
  switch (option) {
    case NONE:
      return {};
    case OPEN_PULL_REQUESTS_THAT_USER_HAS_AUTHORED:
      return {
        type: PullRequest,
        state: Open,
        issueActionUsername: username,
        issueActions: [Authored],
      };
    case OPEN_PULL_REQUESTS_THAT_USER_HAS_COMMENTED_ON:
      return {
        type: PullRequest,
        state: Open,
        issueActionUsername: username,
        issueActions: [Commented],
      };
    case OPEN_PULL_REQUESTS_THAT_USER_HAS_BEEN_ASSIGNED_TO:
      return {
        type: PullRequest,
        state: Open,
        issueActionUsername: username,
        issueActions: [Assigned],
      };
    case OPEN_PULL_REQUESTS_THAT_USER_HAS_BEEN_MENTIONED_ON:
      return {
        type: PullRequest,
        state: Open,
        issueActionUsername: username,
        issueActions: [Mentioned],
      };
    case OPEN_PULL_REQUESTS_THAT_USER_HAS_BEEN_INVOLVED_WITH:
      return {
        type: PullRequest,
        state: Open,
        issueActionUsername: username,
        issueActions: [Involved],
      };
    case CLOSED_PULL_REQUESTS_THAT_USE_HAS_AUTHORED:
      return {
        type: PullRequest,
        state: Closed,
        issueActionUsername: username,
        issueActions: [Authored],
      };
    case CLOSED_PULL_REQUESTS_THAT_USER_HAS_COMMENTED_ON:
      return {
        type: PullRequest,
        state: Closed,
        issueActionUsername: username,
        issueActions: [Commented],
      };
    case CLOSED_PULL_REQUESTS_THAT_USER_HAS_BEEN_ASSIGNED_TO:
      return {
        type: PullRequest,
        state: Closed,
        issueActionUsername: username,
        issueActions: [Assigned],
      };
    case CLOSED_PULL_REQUESTS_THAT_USER_HAS_BEEN_MENTIONED_ON:
      return {
        type: PullRequest,
        state: Closed,
        issueActionUsername: username,
        issueActions: [Mentioned],
      };
    case CLOSED_PULL_REQUESTS_THAT_USER_HAS_BEEN_INVOLVED_WITH:
      return {
        type: PullRequest,
        state: Closed,
        issueActionUsername: username,
        issueActions: [Involved],
      };

    case OPEN_ISSUES_THAT_USER_HAS_AUTHORED:
      return {
        type: Issue,
        state: Open,
        issueActionUsername: username,
        issueActions: [Authored],
      };
    case OPEN_ISSUES_THAT_USER_HAS_COMMENTED_ON:
      return {
        type: Issue,
        state: Open,
        issueActionUsername: username,
        issueActions: [Commented],
      };
    case OPEN_ISSUES_THAT_USER_HAS_BEEN_ASSIGNED_TO:
      return {
        type: Issue,
        state: Open,
        issueActionUsername: username,
        issueActions: [Assigned],
      };
    case OPEN_ISSUES_THAT_USER_HAS_BEEN_MENTIONED_ON:
      return {
        type: Issue,
        state: Open,
        issueActionUsername: username,
        issueActions: [Mentioned],
      };
    case OPEN_ISSUES_THAT_USER_HAS_BEEN_INVOLVED_WITH:
      return {
        type: Issue,
        state: Open,
        issueActionUsername: username,
        issueActions: [Involved],
      };
    case CLOSED_ISSUES_THAT_USE_HAS_AUTHORED:
      return {
        type: Issue,
        state: Closed,
        issueActionUsername: username,
        issueActions: [Authored],
      };
    case CLOSED_ISSUES_THAT_USER_HAS_COMMENTED_ON:
      return {
        type: Issue,
        state: Closed,
        issueActionUsername: username,
        issueActions: [Commented],
      };
    case CLOSED_ISSUES_THAT_USER_HAS_BEEN_ASSIGNED_TO:
      return {
        type: Issue,
        state: Closed,
        issueActionUsername: username,
        issueActions: [Assigned],
      };
    case CLOSED_ISSUES_THAT_USER_HAS_BEEN_MENTIONED_ON:
      return {
        type: Issue,
        state: Closed,
        issueActionUsername: username,
        issueActions: [Mentioned],
      };
    case CLOSED_ISSUES_THAT_USER_HAS_BEEN_INVOLVED_WITH:
      return {
        type: Issue,
        state: Closed,
        issueActionUsername: username,
        issueActions: [Involved],
      };
    default:
      throw new Error(`Unable to identify prompt option: ${option}`);
  }
};

export default buildSearchTermsFromOption;
