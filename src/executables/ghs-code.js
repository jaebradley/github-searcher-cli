#!/usr/bin/env node

/* eslint-disable no-console */

import CodeSearchOptionsSelector from '../services/CodeSearchOptionsSelector';
import SearchService from '../services/SearchService';
import MatchResultsParser from '../services/MatchResultsParser';
import MatchingFilesSelector from '../services/MatchingFilesSelector';
import GitHubCredentialSaver from '../services/GitHubCredentialSaver';

async function executeCodeCommand() {
  if (!GitHubCredentialSaver.hasCredential()) {
    GitHubCredentialSaver.save();
  }

  const searchService = new SearchService();
  const optionsService = new CodeSearchOptionsSelector();
  const options = await optionsService.selectSearchOptions();
  const results = await searchService.searchCode(options);
  const matches = MatchResultsParser.parse(results);
  const filesSelector = new MatchingFilesSelector();
  await filesSelector.selectMatchingFile(matches);
}

try {
  executeCodeCommand();
} catch (e) {
  console.error(`Rut ro! Unexpected error: ${e}`);
}
