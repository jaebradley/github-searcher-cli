import PullRequestSearchPrompter from './PullRequestSearchPrompter';
import GitHubDataStorer from './GitHubDataStorer';
import IssueQueryCreator from './IssueQueryCreator';
import PullRequestSearchService from './PullRequestSearchService';
import PullRequestSearchResultSelector from './PullRequestSearchResultSelector';


class PullRequestSearchCommandService {
  static async execute() {
    const { quickOption } = await PullRequestSearchPrompter.promptSearchOptions();
    const username = await GitHubDataStorer.getUsername();
    const issueQuery = IssueQueryCreator.createFromPromptOption(quickOption, username);
    const accessToken = await GitHubDataStorer.getAuthorizationToken();
    const searchService = new PullRequestSearchService(accessToken);
    const response = await searchService.search(issueQuery);
    const searchResultsSelector = new PullRequestSearchResultSelector();
    await searchResultsSelector.select(response.data.items);
  }
}

export default PullRequestSearchCommandService;
