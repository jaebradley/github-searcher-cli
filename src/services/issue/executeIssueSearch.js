import { selectIssueOption } from '../prompters/IssueOptionSelector';
import buildSearchTermsFromOption from '../buildSearchTermsFromOption';
import Searcher from '../Searcher';
import IssueSearchResultSelector from './IssueSearchResultSelector';
import { getUserIdentityData } from '../UserIdentityService';
import { Failure } from '../../data/constants/Message';

const executeIssueSearch = async () => {
  try {
    const { authorizationToken, username } = await getUserIdentityData();
    const { quickOption } = await selectIssueOption();
    const searchTerms = buildSearchTermsFromOption(quickOption, username);
    const searcher = new Searcher(authorizationToken);
    const response = await searcher.searchIssues(searchTerms);
    const searchResultSelector = new IssueSearchResultSelector();
    await searchResultSelector.select(response.data.items);
  } catch (e) {
    console.log(Failure); // eslint-disable-line no-console
  }
};

export default executeIssueSearch;
