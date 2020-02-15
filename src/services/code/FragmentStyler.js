import chalk from 'chalk';
import {
  TextStyler,
  StyledRange,
  TextStyle,
  TextColor,
  TextFormat,
} from 'textstyler';

const getStyledRanges = (ranges) => ranges
  .map((range) => new StyledRange(range, new TextStyle(TextColor.RED, null, TextFormat.BOLD)));

const styleFragmentText = (fragment) => {
  const { matchingRanges, text } = fragment;
  const styledRanges = getStyledRanges(matchingRanges);
  const styledText = TextStyler.style(text, styledRanges);
  return styledText.replace(/\r?\n?/g, '');
};

const styleFragment = ({ filePath, repositoryName, fragment }) => `${chalk.magenta.bold(filePath)} in ${chalk.bold.yellow(repositoryName)}\n${styleFragmentText(fragment)}`;

export { getStyledRanges, styleFragmentText, styleFragment };
