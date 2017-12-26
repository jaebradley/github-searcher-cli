import GitHubDataStorer from '../GitHubDataStorer';
import MatchResultsParser from './MatchResultsParser';
import MatchingFilesSelector from './MatchingFilesSelector';
import executeSetup from '../../services/setup/executeSetup';
import Searcher from '../Searcher';
import { selectLanguage } from '../prompters/LanguageSelector';
import RepositorySelector from '../prompters/RepositorySelector';
import { promptSearchTerm } from '../prompters/SearchTermPrompter';


class CodeSearchCommandService {
  static async execute() {
    const hasAuthorizationToken = await GitHubDataStorer.hasAuthorizationToken();

    if (!hasAuthorizationToken) {
      await executeSetup();
    }

    const authorizationToken = await GitHubDataStorer.getAuthorizationToken();
    const searcher = new Searcher(authorizationToken);
    const repositorySelector = new RepositorySelector(searcher);

    const { queryString } = await promptSearchTerm();
    const { organizationName, repositoryName } = await repositorySelector.select();
    const { language } = await selectLanguage();

    const options = {
      searchTerm: queryString,
      organizationName,
      repositoryName,
      language,
    };

    const results = await searcher.searchCode(options);
    const matches = MatchResultsParser.parse(results);

    const filesSelector = new MatchingFilesSelector();
    await filesSelector.selectMatchingFile(matches);
  }
}

export default CodeSearchCommandService;
