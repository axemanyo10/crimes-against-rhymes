import { when } from 'jest-when';
import { readFileSync } from 'fs';
import linesFromFile from './read';

jest.mock('fs');

describe('lines from file', () => {
  it('reads given file and returns contents as array of lines', () => {
    when(readFileSync)
      .calledWith('/path/to/file')
      .mockReturnValue('This is\nsome file data\n');
    when(readFileSync)
      .calledWith('/path/to/otherfile')
      .mockReturnValue('');

    expect(linesFromFile('/path/to/file')).toEqual(['This is', 'some file data', '']);
    expect(linesFromFile('/path/to/otherfile')).toEqual(['']);
  });
});
