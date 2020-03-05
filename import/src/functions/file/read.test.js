import { readFileSync } from 'fs';
import linesFromFile from './read';

jest.mock('fs');

describe('lines from file', () => {
  it('reads given file and returns contents as array of lines', () => {
    const fileData = 'This is\nsome file data\n';
    readFileSync.mockReturnValue(fileData);
    expect(linesFromFile('/path/to/file')).toEqual(['This is', 'some file data', '']);
  });
});
