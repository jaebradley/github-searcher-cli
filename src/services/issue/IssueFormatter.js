import chalk from 'chalk';
import moment from 'moment-timezone';

class IssueFormatter {
  static format(issue) {
    const {
      number,
      title,
      labels,
      state,
      comments,
      assignee,
    } = issue;

    const repositoryName = IssueFormatter.parseRepositoryName(issue.repository_url);
    const formattedTitle = IssueFormatter.formatTitle(title);
    const formattedIdentifier = IssueFormatter
      .formatPullRequestIdentifier(repositoryName, number);
    const formattedState = IssueFormatter.formatState(state);
    const formattedCommentCount = IssueFormatter.formatCommentCount(comments);
    const formattedLabels = IssueFormatter.formatLabels(labels);
    const formattedUpdatedAt = IssueFormatter.formatUpdatedAt(issue.updated_at);
    const formattedAssignee = IssueFormatter.formatAssignee(assignee);

    let formattedIssue = '';

    if (formattedState.length > 0) {
      formattedIssue += `${formattedState}`;
    }

    formattedIssue += `${formattedTitle} (${formattedIdentifier}) | ${formattedCommentCount} | ${formattedUpdatedAt}`;

    let nextLine = '';

    if (formattedAssignee.length > 0) {
      nextLine += formattedAssignee;
    }

    if (formattedLabels.length > 0) {
      nextLine += formattedLabels;
    }

    if (nextLine.length > 0) {
      formattedIssue += `\n  ${nextLine}`;
    }

    return formattedIssue;
  }

  static formatTitle(title) {
    return chalk.yellow.bold.underline(title);
  }

  static formatPullRequestIdentifier(repositoryName, pullRequestNumber) {
    return chalk.magenta.bold(`${repositoryName}#${pullRequestNumber}`);
  }

  static formatState(state) {
    if (state === 'closed') {
      return '⛔  ';
    }

    return '';
  }

  static formatUpdatedAt(updatedAt) {
    return `Update ⏰ : ${moment(updatedAt).format('lll')}`;
  }

  static formatCommentCount(commentCount) {
    const commentLevel = IssueFormatter.getCommentLevelEmoji(commentCount);
    return `${commentLevel}  💬  ${commentCount}`;
  }

  static getCommentLevelEmoji(commentCount) {
    if (commentCount < 5) {
      return '😀';
    } if (commentCount < 10) {
      return '🤞';
    } if (commentCount < 15) {
      return '🚧';
    } if (commentCount < 20) {
      return '🤔';
    } if (commentCount < 25) {
      return '🚑';
    } if (commentCount < 30) {
      return '😒';
    } if (commentCount < 35) {
      return '🌋';
    } if (commentCount < 40) {
      return '😩';
    } if (commentCount < 45) {
      return '📈';
    } if (commentCount < 50) {
      return '🖕';
    } if (commentCount < 55) {
      return '💩';
    } if (commentCount < 60) {
      return '😡';
    } if (commentCount < 65) {
      return '💔';
    } if (commentCount < 70) {
      return '😱';
    }
    return '💣 ';
  }

  static formatLabels(labels) {
    if (labels.length === 0) {
      return '';
    }

    const formattedLabels = labels.map((label) => IssueFormatter.formatLabel(label));
    return `🏷  ${formattedLabels.join(' ')}`;
  }

  static formatLabel(label) {
    const { name, color } = label;
    return `${chalk.hex(`#${color}`).bold(`#${name}`)}`;
  }

  static formatAssignee(assignee) {
    if (!assignee) {
      return '';
    }

    return `📍 ${chalk.green.italic.bold(`@${assignee.login}`)}  `;
  }

  static parseRepositoryName(repositoryUrl) {
    const prefix = 'https://api.github.com/repos/';
    return repositoryUrl.substring(repositoryUrl.indexOf(prefix) + prefix.length);
  }
}

export default IssueFormatter;
