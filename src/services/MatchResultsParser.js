import { Range } from 'textstyler';

import MatchingFile from '../data/MatchingFile';
import MatchingFragment from '../data/MatchingFragment';

class MatchResultsParser {
  static parse(results) {
    return results.data.items.map(file => MatchResultsParser.parseFile(file));
  }

  static parseFile(fileData) {
    const {
      name,
      path,
      html_url,
      repository,
      text_matches,
    } = fileData;
    const fullRepositoryName = repository.full_name;
    const matchingFragments = text_matches
      .map(match => MatchResultsParser.parseMatchingFragment(match));
    return new MatchingFile(name, path, html_url, fullRepositoryName, matchingFragments);
  }

  static parseMatchingFragment(matchingFragment) {
    const {
      fragment,
      matches,
    } = matchingFragment;
    // assumes that indices field will only have two values - is this a valid assumption?
    const matchingRanges = matches.map(match => new Range(match.indices[0], match.indices[1] - 1));
    return new MatchingFragment(fragment, matchingRanges);
  }
}

export default MatchResultsParser;
