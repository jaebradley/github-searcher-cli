import GitHubDataStorer from '../GitHubDataStorer';
import Searcher from '../Searcher';
import executeSetup from '../../services/setup/executeSetup';
import { selectCodeQuery } from '../QuerySelector';
import MatchResultsParser from './MatchResultsParser';
import MatchingFilesSelector from './MatchingFilesSelector';
import { Failure } from '../../data/constants/Message';

const executeCodeSearch = async () => {
  try {
    let authorizationToken = await GitHubDataStorer.getAuthorizationToken();

    if (!authorizationToken) {
      await executeSetup();
      authorizationToken = await GitHubDataStorer.getAuthorizationToken();
    }

    const searcher = new Searcher(authorizationToken);
    const queryParameters = await selectCodeQuery(searcher);
    const results = await searcher.searchCode(queryParameters);
    const matches = MatchResultsParser.parse(results);

    const filesSelector = new MatchingFilesSelector();
    await filesSelector.selectMatchingFile(matches);
  } catch (e) {
    console.log(Failure); // eslint-disable-line no-console
  }
};

export default executeCodeSearch;
