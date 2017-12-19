import inquirer from 'inquirer';
import InquirerAutocompletePrompt from 'inquirer-autocomplete-prompt';
import fuzzy from 'fuzzy';

import {
  NONE,
  HAS_NOT_BEEN_REVIEWED,
  REQUIRED,
  APPROVED,
  CHANGES_REQUESTED,
} from '../data/constants/prompts/pullRequest/ReviewStatus';

const CHOICES = [
  NONE,
  HAS_NOT_BEEN_REVIEWED,
  REQUIRED,
  APPROVED,
  CHANGES_REQUESTED,
];

inquirer.registerPrompt('autocomplete', InquirerAutocompletePrompt);

class ReviewStatusOptionPrompter {
  static async prompt() {
    return inquirer.prompt([
      {
        type: 'autocomplete',
        name: 'reviewStatus',
        message: 'Choose a review status',
        source: (answersSoFar, input) => (
          Promise.resolve(fuzzy.filter(input || '', CHOICES).map(match => match.original))
        ),
      },
    ]);
  }
}

export default ReviewStatusOptionPrompter;
