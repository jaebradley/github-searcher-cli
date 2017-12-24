import inquirer from 'inquirer';
import InquirerAutocompletePrompt from 'inquirer-autocomplete-prompt';
import fuzzy from 'fuzzy';

import {
  None,
  HasNotBeenReviewed,
  Required,
  Approved,
  ChangesRequested,
} from '../../data/constants/prompts/pullRequest/ReviewStatus';

const choices = [
  None,
  HasNotBeenReviewed,
  Required,
  Approved,
  ChangesRequested,
];

inquirer.registerPrompt('autocomplete', InquirerAutocompletePrompt);

const filterReviewStatuses = (answersSoFar, input) => Promise.resolve(fuzzy.filter(input || '', choices).map(match => match.original));

const selectReviewStatus = async () => (
  inquirer.prompt([
    {
      type: 'autocomplete',
      name: 'reviewStatus',
      message: 'Choose a review status',
      source: filterReviewStatuses,
    },
  ])
);

export { selectReviewStatus, filterReviewStatuses };
