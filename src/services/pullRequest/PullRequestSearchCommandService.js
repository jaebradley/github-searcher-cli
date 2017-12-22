import PullRequestSearchPrompter from './PullRequestSearchPrompter';
import GitHubDataStorer from '../GitHubDataStorer';
import IssueQueryCreator from '../IssueQueryCreator';
import PullRequestSearchService from './PullRequestSearchService';
import PullRequestSearchResultSelector from './PullRequestSearchResultSelector';
import SetupCommandService from '../setup/SetupCommandService';
import IssueStateParametersPrompt from '../IssueStateParametersPrompt';
import { PullRequest } from '../../data/constants/github/issue/Type';
import { NONE } from '../../data/constants/prompts/pullRequest/Options';
import RepositorySearcher from '../RepositorySearcher';
import ReviewStatusOptionPrompter from '../ReviewStatusOptionPrompter';
import { selectLanguage } from '../prompters/LanguageSelector';
import RepositorySelector from '../prompters/RepositorySelector';
import { promptSearchTerm } from '../prompters/SearchTermPrompter';
import { selectUserIssueActions } from '../prompters/UserIssueActionsSelector';


class PullRequestSearchCommandService {
  static async execute() {
    let authorizationToken = await GitHubDataStorer.getAuthorizationToken();
    let username = await GitHubDataStorer.getUsername();

    if (!authorizationToken || !username) {
      await SetupCommandService.execute();
      authorizationToken = await GitHubDataStorer.getAuthorizationToken();
      username = await GitHubDataStorer.getUsername();
    }

    let issueQuery;
    const { quickOption } = await PullRequestSearchPrompter.promptSearchOptions();
    if (quickOption === NONE) {
      const repositorySearcher = new RepositorySearcher(authorizationToken);
      const repositorySelector = new RepositorySelector(repositorySearcher);

      const { queryString } = await promptSearchTerm();
      const { organizationName, repositoryName } = await repositorySelector.select();
      const { language } = await selectLanguage();

      const userIssueActions = await selectUserIssueActions();
      const queryUsername = userIssueActions.username;
      const { actions } = userIssueActions;

      const { state } = await IssueStateParametersPrompt.prompt();
      const { reviewStatus } = await ReviewStatusOptionPrompter.prompt();

      issueQuery = IssueQueryCreator.create(
        queryString,
        PullRequest,
        state,
        queryUsername,
        actions,
        organizationName,
        repositoryName,
        language,
        reviewStatus,
      );
    } else {
      issueQuery = IssueQueryCreator.createFromPromptOption(quickOption, username);
    }

    const searchService = new PullRequestSearchService(authorizationToken);
    const response = await searchService.search(issueQuery);
    const searchResultsSelector = new PullRequestSearchResultSelector();
    await searchResultsSelector.select(response.data.items);
  }
}

export default PullRequestSearchCommandService;
