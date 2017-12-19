class IssueQuery {
  constructor({
    queryString,
    organizationName,
    repositoryName,
    type,
    state,
    reviewStatus,
    author,
    commenter,
    assignee,
    mentions,
    involves,
  }) {
    this.queryString = queryString;
    this.organizationName = organizationName;
    this.repositoryName = repositoryName;
    this.type = type;
    this.state = state;
    this.reviewStatus = reviewStatus;
    this.author = author;
    this.commenter = commenter;
    this.assignee = assignee;
    this.mentions = mentions;
    this.involves = involves;
  }
}

export default IssueQuery;
