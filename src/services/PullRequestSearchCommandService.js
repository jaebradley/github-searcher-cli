import PullRequestSearchPrompter from './PullRequestSearchPrompter';
import GitHubDataStorer from './GitHubDataStorer';
import IssueQueryCreator from './IssueQueryCreator';
import PullRequestSearchService from './PullRequestSearchService';
import PullRequestSearchResultSelector from './PullRequestSearchResultSelector';
import SetupCommandService from './SetupCommandService';


class PullRequestSearchCommandService {
  static async execute() {
    let accessToken = await GitHubDataStorer.getAuthorizationToken();
    let username = await GitHubDataStorer.getUsername();

    if (accessToken || username) {
      await SetupCommandService.execute();
      accessToken = await GitHubDataStorer.getAuthorizationToken();
      username = await GitHubDataStorer.getUsername();
    }

    const { quickOption } = await PullRequestSearchPrompter.promptSearchOptions();
    const issueQuery = IssueQueryCreator.createFromPromptOption(quickOption, username);
    const searchService = new PullRequestSearchService(accessToken);
    const response = await searchService.search(issueQuery);
    const searchResultsSelector = new PullRequestSearchResultSelector();
    await searchResultsSelector.select(response.data.items);
  }
}

export default PullRequestSearchCommandService;
