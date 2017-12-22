import GitHubDataStorer from '../GitHubDataStorer';
import MatchResultsParser from './MatchResultsParser';
import MatchingFilesSelector from './MatchingFilesSelector';
import RepositorySearcher from '../RepositorySearcher';
import SetupCommandService from '../../services/setup/SetupCommandService';
import CodeSearcher from './CodeSearcher';
import { selectLanguage } from '../prompters/LanguageSelector';
import RepositorySelector from '../prompters/RepositorySelector';
import { promptSearchTerm } from '../prompters/SearchTermPrompter';


class CodeSearchCommandService {
  static async execute() {
    const hasAuthorizationToken = await GitHubDataStorer.hasAuthorizationToken();

    if (!hasAuthorizationToken) {
      await SetupCommandService.execute();
    }

    const authorizationToken = await GitHubDataStorer.getAuthorizationToken();
    const repositorySearcher = new RepositorySearcher(authorizationToken);
    const repositorySelector = new RepositorySelector(repositorySearcher);

    const { queryString } = await promptSearchTerm();
    const { organizationName, repositoryName } = await repositorySelector.select();
    const { language } = await selectLanguage();

    const options = {
      searchTerm: queryString,
      organizationName,
      repositoryName,
      language,
    };

    const codeSearcher = new CodeSearcher(authorizationToken);

    const results = await codeSearcher.search(options);

    const matches = MatchResultsParser.parse(results);

    const filesSelector = new MatchingFilesSelector();
    await filesSelector.selectMatchingFile(matches);
  }
}

export default CodeSearchCommandService;
