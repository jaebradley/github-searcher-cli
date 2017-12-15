#!/usr/bin/env node

import program from 'commander';

import pkg from '../../package.json';

program.version(pkg.version)
  .description('GitHub search from the command line')
  .command('setup', 'add GitHub OAuth Token')
  .command('code', 'search code in GitHub')
  .command('pr', 'search Pull Requests in GitHub')
  .command('issue', 'search Issues in GitHub')
  .parse(process.argv);
