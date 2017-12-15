import colors from 'colors';
import {
  TextStyler,
  StyledRange,
  TextStyle,
  TextColor,
  TextFormat,
} from 'textstyler';

class MatchingFragmentFormatter {
  static format(filePath, fullRepositoryName, matchingFragment) {
    return `${colors.bold(colors.magenta(filePath))} in ${colors.bold(colors.yellow(fullRepositoryName))}\n${MatchingFragmentFormatter.formatFragment(matchingFragment)}`;
  }

  static formatFragment(fragment) {
    const styledRanges = fragment.matchingRanges
      .map(range => new StyledRange(range, MatchingFragmentFormatter.getStyle()));
    const styledText = TextStyler.style(fragment.text, styledRanges);
    // This is temporary and will be removed when better multiline support is added to inquirer.js
    return styledText.replace(/\r?\n?/g, '');
  }

  static getStyle() {
    return new TextStyle(TextColor.RED, null, TextFormat.BOLD);
  }
}

export default MatchingFragmentFormatter;
