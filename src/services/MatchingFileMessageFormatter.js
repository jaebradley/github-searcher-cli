import colors from 'colors';
import { TextStyler, StyledRange, TextStyle, TextColor, TextFormat } from 'textstyler';

class MatchingFileMessageFormatter {
  static format(file) {
    return `${colors.bold(colors.magenta(file.path))} in ${colors.bold(colors.yellow(file.fullRepositoryName))}
${file.matchingFragments.map(fragment => `${colors.underline(colors.white('Match:'))}\n${MatchingFileMessageFormatter.formatFragment(fragment)}`).join('\n')}`;
  }

  static formatFragment(fragment) {
    const styledRanges = fragment.matchingRanges
      .map(range => new StyledRange(range, MatchingFileMessageFormatter.getStyle()));
    return TextStyler.style(fragment.text, styledRanges);
  }

  static getStyle() {
    return new TextStyle(TextColor.RED, null, TextFormat.BOLD);
  }
}

export default MatchingFileMessageFormatter;
