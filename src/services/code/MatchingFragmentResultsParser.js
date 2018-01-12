const parseFragmentMatches = ({ fragment, matches }) => (
  {
    text: fragment,
    matchingRanges: matches.map(match => ({ start: match.indices[0], end: match.indices[1] })),
  }
);

const parseResults = results => (
  results.data.items.map(item => ({
    fullRepositoryName: item.repository.full_name,
    matchingFragments: item.text_matches.map(textMatch => parseFragmentMatches(textMatch)),
    browserURL: item.html_url,
    name: item.name,
    path: item.path,
  }))
);

export { parseFragmentMatches, parseResults };
