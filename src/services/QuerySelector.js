import { selectLanguage } from './prompters/LanguageSelector';
import RepositorySelector from './prompters/RepositorySelector';
import { promptSearchTerm } from './prompters/SearchTermPrompter';
import IssueSearchPrompter from './issue/IssueSearchPrompter';

const selectCodeQuery = async (searcher) => {
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

const selectIssueQuery = async () => {
  const { quickOption } = await IssueSearchPrompter.promptSearchOptions();
  return { quickOption };
};

export {
  selectCodeQuery,
  selectIssueQuery,
};
