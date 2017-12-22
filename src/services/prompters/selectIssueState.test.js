import inquirer from 'inquirer';
import { Open, Closed } from '../../data/constants/github/issue/State';
import selectIssueState from './selectIssueState';

describe('selectIssueState', () => {
  let inquirerSpy;

  beforeEach(() => {
    inquirerSpy = jest.spyOn(inquirer, 'prompt').mockReturnValue('foobar');
  });

  afterEach(() => {
    inquirerSpy.mockRestore();
  });

  it('should return prompt', async () => {
    const expected = [
      {
        type: 'list',
        name: 'state',
        message: 'Filter by issue state',
        choices: [Open, Closed],
      },
    ];

    expect(selectIssueState()).resolves.toEqual('foobar');

    expect(inquirerSpy).toHaveBeenCalledTimes(1);
    expect(inquirerSpy).toHaveBeenCalledWith(expected);
  });
});
