import { when } from 'jest-when';
import { allWordAttributes } from './parse/cmuDictionary';
import fileLines from './file/read';
import wordPopularityRank from './parse/popularityRank';
import getAllWords from './compileWords';

jest.mock('./parse/cmuDictionary');
jest.mock('./parse/popularityRank');
jest.mock('./file/read');

const setupMocks = () => {
  when(fileLines)
    .calledWith('/tmp/cmufile')
    .mockReturnValue(['relax R IH0 L AE1 K S', 'detainee D IY2 T EY0 N IY1']);
  when(fileLines)
    .calledWith('/tmp/rankFile')
    .mockReturnValue(['relax', 'detainee']);
  when(fileLines)
    .calledWith('/tmp/nouns')
    .mockReturnValue(['detainee']);
  when(fileLines)
    .calledWith('/tmp/verbs')
    .mockReturnValue(['relax']);
  when(allWordAttributes)
    .calledWith(['relax R IH0 L AE1 K S', 'detainee D IY2 T EY0 N IY1'])
    .mockReturnValue([
      { word: 'relax', stress: 'AE', position: 0, before: 'L', after: 'K S', syllables: 2 },
      { word: 'detainee', stress: 'IY', position: 0, before: 'N', after: '', syllables: 3 },
    ]);
  when(wordPopularityRank)
    .calledWith('relax', ['relax', 'detainee'])
    .mockReturnValue(1);
  when(wordPopularityRank)
    .calledWith('detainee', ['relax', 'detainee'])
    .mockReturnValue(2);
};

describe('get all words', () => {
  it('returns an array of word attribute objects', () => {
    setupMocks();

    expect(getAllWords('/tmp/cmufile', '/tmp/rankFile', '/tmp/nouns', '/tmp/verbs')).toEqual([
      {
        word: 'relax',
        stress: 'AE',
        position: 0,
        before: 'L',
        after: 'K S',
        syllables: 2,
        rank: 1,
        noun: false,
        verb: true,
      },
      {
        word: 'detainee',
        stress: 'IY',
        position: 0,
        before: 'N',
        after: '',
        syllables: 3,
        rank: 2,
        noun: true,
        verb: false,
      },
    ]);
  });
});
