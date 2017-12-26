import MatchResultsParser from './MatchResultsParser';
import MatchingFilesSelector from './MatchingFilesSelector';
import Searcher from '../Searcher';
import { getAuthorizationToken, selectOptions, findMatchingFiles } from './CodeSearchOptionsSelector';

const executeCodeSearch = async () => {
  const authorizationToken = await getAuthorizationToken();
  const searcher = new Searcher(authorizationToken);
  const options = await selectOptions(searcher);
  await findMatchingFiles(searcher, options);
};

export default executeCodeSearch;
