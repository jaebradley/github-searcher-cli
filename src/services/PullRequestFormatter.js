import chalk from 'chalk';
import moment from 'moment-timezone';

class PullRequestFormatter {
  static format(pullRequest) {
    const {
      number,
      title,
      repository_url,
      labels,
      state,
      comments,
      updated_at,
    } = pullRequest;

    const repositoryName = PullRequestFormatter.parseRepositoryName(repository_url);
    const formattedTitle = PullRequestFormatter.formatTitle(title);
    const formattedIdentifier = PullRequestFormatter
      .formatPullRequestIdentifier(repositoryName, number);
    const formattedState = PullRequestFormatter.formatState(state);
    const formattedCommentCount = PullRequestFormatter.formatCommentCount(comments);
    const formattedLabels = PullRequestFormatter.formatLabels(labels);
    const formattedUpdatedAt = PullRequestFormatter.formatUpdatedAt(updated_at);

    let formattedPullRequest = '';

    if (formattedState.length > 0) {
      formattedPullRequest += `${formattedState}`;
    }

    formattedPullRequest += `${formattedTitle} (${formattedIdentifier}) | ${formattedCommentCount} | ${formattedUpdatedAt}`;

    if (formattedLabels.length > 0) {
      formattedPullRequest += `\n${formattedLabels}`;
    }

    return formattedPullRequest;
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
    const commentLevel = PullRequestFormatter.getCommentLevelEmoji(commentCount);
    return `${commentLevel}  💬  ${commentCount}`;
  }

  static getCommentLevelEmoji(commentCount) {
    if (commentCount < 5) {
      return '😀';
    } else if (commentCount < 10) {
      return '🤞';
    } else if (commentCount < 15) {
      return '🚧';
    } else if (commentCount < 20) {
      return '🤔';
    } else if (commentCount < 25) {
      return '🚑';
    } else if (commentCount < 30) {
      return '😒';
    } else if (commentCount < 35) {
      return '🌋';
    } else if (commentCount < 40) {
      return '😩';
    } else if (commentCount < 45) {
      return '📈';
    } else if (commentCount < 50) {
      return '🖕';
    } else if (commentCount < 55) {
      return '💩';
    } else if (commentCount < 60) {
      return '😡';
    } else if (commentCount < 65) {
      return '💔';
    } else if (commentCount < 70) {
      return '😱';
    }
    return '💣 ';
  }

  static formatLabels(labels) {
    if (labels.length === 0) {
      return '';
    }

    const formattedLabels = labels.map(label => PullRequestFormatter.formatLabel(label));
    return `🏷  ${formattedLabels.join(' ')}`;
  }

  static formatLabel(label) {
    const { name, color } = label;
    return `${chalk.hex(`#${color}`).bold(`#${name}`)}`;
  }

  static parseRepositoryName(repositoryUrl) {
    const prefix = 'https://api.github.com/repos/';
    return repositoryUrl.substring(repositoryUrl.indexOf(prefix) + prefix.length);
  }
}

export default PullRequestFormatter;
