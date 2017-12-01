#!/usr/bin/env node

/* eslint-disable no-console */

import GitHubCredentialSaver from '../services/GitHubCredentialSaver';

try {
  GitHubCredentialSaver.save();
} catch (e) {
  console.error(e);
}
