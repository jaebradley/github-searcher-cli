import CodeSearchParametersPrompter from './CodeSearchParametersPrompter';
import GitHubDataStorer from '../GitHubDataStorer';
import MatchResultsParser from './MatchResultsParser';
import MatchingFilesSelector from './MatchingFilesSelector';
import RepositorySearcher from '../RepositorySearcher';
import SetupCommandService from '../../services/SetupCommandService';
import SearchOptions from '../../data/SearchOptions';
import CodeSearcher from './CodeSearcher';


class CodeSearchCommandService {
  static async execute() {
    const hasAuthorizationToken = await GitHubDataStorer.hasAuthorizationToken();

    if (!hasAuthorizationToken) {
      await SetupCommandService.execute();
    }

    const authorizationToken = await GitHubDataStorer.getAuthorizationToken();
    const repositorySearcher = new RepositorySearcher(authorizationToken);
    const prompter = new CodeSearchParametersPrompter(repositorySearcher);

    const {
      queryString,
      organizationName,
      repositoryName,
      language,
    } = await prompter.promptSearchParameters();

    const options = new SearchOptions(queryString, organizationName, repositoryName, language);

    const codeSearcher = new CodeSearcher(authorizationToken);

    const results = await codeSearcher.search(options);

    const matches = MatchResultsParser.parse(results);

    const filesSelector = new MatchingFilesSelector();
    await filesSelector.selectMatchingFile(matches);
  }
}

export default CodeSearchCommandService;
