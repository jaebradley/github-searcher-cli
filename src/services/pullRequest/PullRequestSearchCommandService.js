import PullRequestSearchPrompter from './PullRequestSearchPrompter';
import GitHubDataStorer from '../GitHubDataStorer';
import Searcher from '../Searcher';
import PullRequestSearchResultSelector from './PullRequestSearchResultSelector';
import executeSetup from '../setup/executeSetup';
import selectIssueState from '../prompters/selectIssueState';
import { PullRequest } from '../../data/constants/github/issue/Type';
import { NONE } from '../../data/constants/prompts/pullRequest/Options';
import { selectReviewStatus } from '../prompters/ReviewStatusSelector';
import { selectLanguage } from '../prompters/LanguageSelector';
import RepositorySelector from '../prompters/RepositorySelector';
import { promptSearchTerm } from '../prompters/SearchTermPrompter';
import { selectUserIssueActions } from '../prompters/UserIssueActionsSelector';
import buildSearchTermsFromOption from '../buildSearchTermsFromOption';


class PullRequestSearchCommandService {
  static async execute() {
    let authorizationToken = await GitHubDataStorer.getAuthorizationToken();
    let username = await GitHubDataStorer.getUsername();

    if (!authorizationToken || !username) {
      await executeSetup();
      authorizationToken = await GitHubDataStorer.getAuthorizationToken();
      username = await GitHubDataStorer.getUsername();
    }

    const searcher = new Searcher(authorizationToken);

    let options;
    const { quickOption } = await PullRequestSearchPrompter.promptSearchOptions();
    if (quickOption === NONE) {
      const repositorySelector = new RepositorySelector(searcher);

      const { queryString } = await promptSearchTerm();
      const { organizationName, repositoryName } = await repositorySelector.select();
      const { language } = await selectLanguage();

      const userIssueActions = await selectUserIssueActions();
      const queryUsername = userIssueActions.username;
      const { actions } = userIssueActions;

      const { state } = await selectIssueState();
      const { reviewStatus } = await selectReviewStatus();

      options = {
        searchTerm: queryString,
        type: PullRequest,
        issueActionUsername: queryUsername,
        issueActions: actions,
        organizationName,
        repositoryName,
        state,
        language,
        reviewStatus,
      };
    } else {
      options = buildSearchTermsFromOption(quickOption, username);
    }

    const response = await searcher.searchIssues(options);
    const searchResultsSelector = new PullRequestSearchResultSelector();
    await searchResultsSelector.select(response.data.items);
  }
}

export default PullRequestSearchCommandService;
