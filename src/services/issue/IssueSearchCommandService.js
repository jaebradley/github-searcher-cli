import GitHubDataStorer from '../GitHubDataStorer';
import IssueSearchPrompter from './IssueSearchPrompter';
import IssueQueryCreator from '../IssueQueryCreator';
import IssueSearcher from './IssueSearcher';
import IssueSearchResultSelector from './IssueSearchResultSelector';
import SetupCommandService from '../setup/SetupCommandService';


class IssueSearchCommandService {
  static async execute() {
    let accessToken = await GitHubDataStorer.getAuthorizationToken();
    let username = await GitHubDataStorer.getUsername();

    if (!accessToken || !username) {
      await SetupCommandService.execute();
      accessToken = await GitHubDataStorer.getAuthorizationToken();
      username = await GitHubDataStorer.getUsername();
    }

    const { quickOption } = await IssueSearchPrompter.promptSearchOptions();
    const issueQuery = IssueQueryCreator.createFromPromptOption(quickOption, username);
    const searcher = new IssueSearcher(accessToken);
    const response = await searcher.search(issueQuery);
    const searchResultSelector = new IssueSearchResultSelector();
    await searchResultSelector.select(response.data.items);
  }
}

export default IssueSearchCommandService;
