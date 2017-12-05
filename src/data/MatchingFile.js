class MatchingFile {
  constructor(name, path, browserURL, fullRepositoryName, matchingFragments) {
    this.name = name;
    this.path = path;
    this.browserURL = browserURL;
    this.fullRepositoryName = fullRepositoryName;
    this.matchingFragments = matchingFragments;
  }
}

export default MatchingFile;
