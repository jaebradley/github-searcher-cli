import inquirer from 'inquirer';
import open from 'open';

import MatchingFileMessageFormatter from './MatchingFileMessageFormatter';

class MatchingFilesOutputter {
  constructor() {
    // hacky memoization due to inquirer only passing back selected string
    this.messageToBrowserURLs = {};
  }

  async getChoice(files) {
    const prompt = await this.getPrompt(files);
    open(this.messageToBrowserURLs[prompt.matchingFile]);
  }

  async getPrompt(files) {
    return inquirer.prompt([
      {
        name: 'matchingFile',
        message: 'Select matching file',
        type: 'list',
        paginated: false,
        choices: this.getChoices(files),
        pageSize: 50,
      },
    ]);
  }

  getChoices(files) {
    const choices = [];
    files.forEach((file) => {
      const message = MatchingFileMessageFormatter.format(file).trim();
      this.messageToBrowserURLs[message] = file.browserURL;
      choices.push({
        name: message,
        short: file.path,
      });
      choices.push(new inquirer.Separator());
    });
    return choices;
  }
}

export default MatchingFilesOutputter;
