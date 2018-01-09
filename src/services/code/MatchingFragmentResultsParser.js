const parseFragmentMatches = ({ fragment, matches }) => (
  {
    text: fragment,
    matchingRanges: matches.map(match => ({ start: match.indices[0], end: match.indices[1] })),
  }
);

const parseResults = results => (
  results.data.items.map(({
    name, path, html_url, repository, text_matches,
  }) => ({
    fullRepositoryName: repository.full_name,
    matchingFragments: text_matches.map(textMatch => parseFragmentMatches(textMatch)),
    browserURL: html_url,
    name,
    path,
  }))
);

export { parseFragmentMatches, parseResults };
