class IssueQuery {
  constructor({
    type,
    state,
    author,
    commenter,
    assignee,
    mentions,
    involves,
  }) {
    this.type = type;
    this.state = state;
    this.author = author;
    this.commenter = commenter;
    this.assignee = assignee;
    this.mentions = mentions;
    this.involves = involves;
  }
}

export default IssueQuery;
