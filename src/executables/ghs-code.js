#!/usr/bin/env node

/* eslint-disable no-console */

import CodeSearchOptions from '../services/CodeSearchOptions';
import SearchService from '../services/SearchService';
import MatchResultsParser from '../services/MatchResultsParser';
import MatchingFilesOutputter from '../services/MatchingFilesOutputter';

async function executeCodeCommand() {
  const searchService = new SearchService();
  const optionsService = new CodeSearchOptions();
  const options = await optionsService.getOptions();
  const results = await searchService.searchCode(options);
  const matches = MatchResultsParser.parse(results);
  const outputter = new MatchingFilesOutputter();
  await outputter.getChoice(matches);
}

try {
  executeCodeCommand();
} catch (e) {
  console.error(e);
}
