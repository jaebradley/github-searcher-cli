class SearchOptions {
  constructor(queryString, organizationName, repositoryName, language) {
    this.queryString = queryString;
    this.organizationName = organizationName;
    this.repositoryName = repositoryName;
    this.language = language;
  }
}

export default SearchOptions;
