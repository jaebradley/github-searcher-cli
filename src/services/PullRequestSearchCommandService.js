import PullRequestSearchPrompter from './PullRequestSearchPrompter';
import GitHubDataStorer from './GitHubDataStorer';
import IssueQueryCreator from './IssueQueryCreator';
import PullRequestSearchService from './PullRequestSearchService';
import PullRequestSearchResultSelector from './PullRequestSearchResultSelector';
import SetupCommandService from './SetupCommandService';
import SearchParametersPrompter from './SearchParametersPrompter';
import UserActionParametersPrompter from './UserActionParametersPrompter';
import IssueStateParametersPrompt from './IssueStateParametersPrompt';
import IssueType from '../data/constants/IssueType';
import { NONE } from '../data/constants/prompts/pullRequest/Options';
import RepositorySearcher from './RepositorySearcher';
import ReviewStatusOptionPrompter from './ReviewStatusOptionPrompter';


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
      const searchParametersPrompter = new SearchParametersPrompter(repositorySearcher);
      const {
        queryString,
        organizationName,
        repositoryName,
        language,
      } = await searchParametersPrompter.promptSearchParameters();
      const { queryUsername, actions } = await UserActionParametersPrompter.prompt();
      const { state } = await IssueStateParametersPrompt.prompt();
      const { reviewStatus } = await ReviewStatusOptionPrompter.prompt();
      issueQuery = IssueQueryCreator.create(
        queryString,
        IssueType.PULL_REQUEST,
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
