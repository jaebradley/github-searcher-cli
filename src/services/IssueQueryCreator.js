import IssueQuery from '../data/IssueQuery';
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


class IssueQueryCreator {
  static create(
    queryString,
    type,
    state,
    username,
    actions,
    organizationName,
    repositoryName,
    language,
    reviewStatus,
  ) {
    const baseQuery = {};
    baseQuery.queryString = queryString;
    baseQuery.type = type;
    baseQuery.state = state;
    baseQuery.organizationName = organizationName;
    baseQuery.repositoryName = repositoryName;
    baseQuery.language = language;
    baseQuery.reviewStatus = reviewStatus;

    if (actions) {
      if (actions.includes(Authored)) {
        baseQuery.author = username;
      }

      if (actions.includes(Commented)) {
        baseQuery.commenter = username;
      }

      if (actions.includes(Mentioned)) {
        baseQuery.mentions = username;
      }

      if (actions.includes(Involved)) {
        baseQuery.involves = username;
      }

      if (actions.includes(Assigned)) {
        baseQuery.assignee = username;
      }
    }

    return new IssueQuery(baseQuery);
  }

  static createFromPromptOption(option, username) {
    switch (option) {
      case NONE:
        return new IssueQuery();
      case OPEN_PULL_REQUESTS_THAT_USER_HAS_AUTHORED:
        return new IssueQuery({
          type: PullRequest,
          state: Open,
          author: username,
        });
      case OPEN_PULL_REQUESTS_THAT_USER_HAS_COMMENTED_ON:
        return new IssueQuery({
          type: PullRequest,
          state: Open,
          commenter: username,
        });
      case OPEN_PULL_REQUESTS_THAT_USER_HAS_BEEN_ASSIGNED_TO:
        return new IssueQuery({
          type: PullRequest,
          state: Open,
          assignee: username,
        });
      case OPEN_PULL_REQUESTS_THAT_USER_HAS_BEEN_MENTIONED_ON:
        return new IssueQuery({
          type: PullRequest,
          state: Open,
          mentions: username,
        });
      case OPEN_PULL_REQUESTS_THAT_USER_HAS_BEEN_INVOLVED_WITH:
        return new IssueQuery({
          type: PullRequest,
          state: Open,
          involves: username,
        });
      case CLOSED_PULL_REQUESTS_THAT_USE_HAS_AUTHORED:
        return new IssueQuery({
          type: PullRequest,
          state: Closed,
          author: username,
        });
      case CLOSED_PULL_REQUESTS_THAT_USER_HAS_COMMENTED_ON:
        return new IssueQuery({
          type: PullRequest,
          state: Closed,
          commenter: username,
        });
      case CLOSED_PULL_REQUESTS_THAT_USER_HAS_BEEN_ASSIGNED_TO:
        return new IssueQuery({
          type: PullRequest,
          state: Closed,
          assignee: username,
        });
      case CLOSED_PULL_REQUESTS_THAT_USER_HAS_BEEN_MENTIONED_ON:
        return new IssueQuery({
          type: PullRequest,
          state: Closed,
          mentions: username,
        });
      case CLOSED_PULL_REQUESTS_THAT_USER_HAS_BEEN_INVOLVED_WITH:
        return new IssueQuery({
          type: PullRequest,
          state: Closed,
          involves: username,
        });

      case OPEN_ISSUES_THAT_USER_HAS_AUTHORED:
        return new IssueQuery({
          type: Issue,
          state: Open,
          author: username,
        });
      case OPEN_ISSUES_THAT_USER_HAS_COMMENTED_ON:
        return new IssueQuery({
          type: Issue,
          state: Open,
          commenter: username,
        });
      case OPEN_ISSUES_THAT_USER_HAS_BEEN_ASSIGNED_TO:
        return new IssueQuery({
          type: Issue,
          state: Open,
          assignee: username,
        });
      case OPEN_ISSUES_THAT_USER_HAS_BEEN_MENTIONED_ON:
        return new IssueQuery({
          type: Issue,
          state: Open,
          mentions: username,
        });
      case OPEN_ISSUES_THAT_USER_HAS_BEEN_INVOLVED_WITH:
        return new IssueQuery({
          type: Issue,
          state: Open,
          involves: username,
        });
      case CLOSED_ISSUES_THAT_USE_HAS_AUTHORED:
        return new IssueQuery({
          type: Issue,
          state: Closed,
          author: username,
        });
      case CLOSED_ISSUES_THAT_USER_HAS_COMMENTED_ON:
        return new IssueQuery({
          type: Issue,
          state: Closed,
          commenter: username,
        });
      case CLOSED_ISSUES_THAT_USER_HAS_BEEN_ASSIGNED_TO:
        return new IssueQuery({
          type: Issue,
          state: Closed,
          assignee: username,
        });
      case CLOSED_ISSUES_THAT_USER_HAS_BEEN_MENTIONED_ON:
        return new IssueQuery({
          type: Issue,
          state: Closed,
          mentions: username,
        });
      case CLOSED_ISSUES_THAT_USER_HAS_BEEN_INVOLVED_WITH:
        return new IssueQuery({
          type: Issue,
          state: Closed,
          involves: username,
        });
      default:
        throw new Error(`Unable to identify prompt option: ${option}`);
    }
  }
}

export default IssueQueryCreator;
