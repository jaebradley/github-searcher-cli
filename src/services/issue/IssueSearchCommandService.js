import GitHubDataStorer from '../GitHubDataStorer';
import { selectIssueOption } from '../prompters/IssueOptionSelector';
import buildSearchTermsFromOption from '../buildSearchTermsFromOption';
import Searcher from '../Searcher';
import IssueSearchResultSelector from './IssueSearchResultSelector';
import executeSetup from '../setup/executeSetup';


class IssueSearchCommandService {
  static async execute() {
    let accessToken = await GitHubDataStorer.getAuthorizationToken();
    let username = await GitHubDataStorer.getUsername();

    if (!accessToken || !username) {
      await executeSetup();
      accessToken = await GitHubDataStorer.getAuthorizationToken();
      username = await GitHubDataStorer.getUsername();
    }

    const { quickOption } = await selectIssueOption();
    const searchTerms = buildSearchTermsFromOption(quickOption, username);
    const searcher = new Searcher(accessToken);
    const response = await searcher.searchIssues(searchTerms);
    const searchResultSelector = new IssueSearchResultSelector();
    await searchResultSelector.select(response.data.items);
  }
}

export default IssueSearchCommandService;
