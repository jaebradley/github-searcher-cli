[![Build Status](https://travis-ci.org/jaebradley/github-searcher-cli.svg?branch=master)](https://travis-ci.org/jaebradley/github-searcher-cli)
[![npm](https://img.shields.io/npm/dt/github-searcher-cli.svg)](https://www.npmjs.com/package/github-searcher-cli)
[![npm](https://img.shields.io/npm/v/github-searcher-cli.svg)](https://www.npmjs.com/package/github-searcher-cli)

# GitHub Searcher CLI

## Introduction
GitHub has some great search functionality (especially for [code searches](https://github.com/search?utf8=%E2%9C%93&q=&type=Code)). That being said, it can be annoying to look for code samples in various repositories via the web search UI (especially when switching from doing work in the Terminal). Thus, this command line tool hopes to replace some of the functionality that the GitHub search service provides.

This CLI is in active development and is missing some key features I hope to implement (maybe with the help of you)!

## Installation
```npm install github-searcher-cli -g```

## Commands

### `ghs setup`
This should be the first command you execute. It will ask for [a personal access token](https://github.com/blog/1509-personal-api-tokens) that will be used to authenticate future requests.

### `ghs code`
This command will allow you to search matching code fragments for a given search parameter set.

*Query Parameters*
- A search query string is required
- An organization (like [`github`](https://github.com/github) or owner name (like [`jaebradley`](https://github.com/jaebradley) is optional
- A repository name is also optional. If a `None` organization value is provided, the repository name will not be applied to the search
- An optional language value (like `Javascript`

There will be a selection of matching code fragments that are returned - these code fragments are searchable. When a code fragment is selected with return key down, the file associated with that code fragment will be opened in your default browser.

Unfortunately, [`inquirer.js`](https://github.com/SBoudrias/Inquirer.js/) doesn't deal with multiline list choices very well (especially when it comes to arrow key navigation). This is a known issue that [this PR](https://github.com/SBoudrias/Inquirer.js/pull/389) hopes to tackle.

**Example**

*Search for instances of `jaebradley` across GitHub in Javascript files*
![alt-text](https://media.giphy.com/media/xT0xexoD8IdbBujICQ/giphy.gif)


Other search functionality (like searching issues or pull requests are forthcoming).
