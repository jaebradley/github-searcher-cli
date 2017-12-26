import GitHubDataStorer from '../GitHubDataStorer';
import executeSetup from '../../services/setup/executeSetup';
import { selectLanguage } from '../prompters/LanguageSelector';
import RepositorySelector from '../prompters/RepositorySelector';
import { promptSearchTerm } from '../prompters/SearchTermPrompter';
import MatchResultsParser from './MatchResultsParser';
import MatchingFilesSelector from './MatchingFilesSelector';

const getAuthorizationToken = async () => {
  let authorizationToken = await GitHubDataStorer.getAuthorizationToken();

  if (!authorizationToken) {
    await executeSetup();
    authorizationToken = await GitHubDataStorer.getAuthorizationToken();
  }
  return authorizationToken;
};

const selectOptions = async (searcher) => {
  const repositorySelector = new RepositorySelector(searcher);

  const { queryString } = await promptSearchTerm();
  const { organizationName, repositoryName } = await repositorySelector.select();
  const { language } = await selectLanguage();

  return {
    searchTerm: queryString,
    organizationName,
    repositoryName,
    language,
  };
};

const findMatchingFiles = async (searcher, options) => {
  const results = await searcher.searchCode(options);
  const matches = MatchResultsParser.parse(results);

  const filesSelector = new MatchingFilesSelector();
  await filesSelector.selectMatchingFile(matches);
};

export {
  getAuthorizationToken,
  selectOptions,
  findMatchingFiles,
};
