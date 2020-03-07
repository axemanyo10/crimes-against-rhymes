import { fs } from 'memfs';
import getAllWords from '../../functions/compileWords';

describe('compile array of word attributes from dictionary files', () => {
  it('handles empty files', () => {
    fs.writeFileSync('/cmudict.txt', '');
    fs.writeFileSync('/top10k.txt', '');
    fs.writeFileSync('/nouns.txt', '');
    fs.writeFileSync('/verbs.txt', '');

    const result = getAllWords('/cmudict.txt', '/top10k.txt', '/nouns.txt', '/verbs.txt', fs);

    expect(result).toEqual([]);
  });

  it('handles non-empty files', () => {
    fs.writeFileSync('/cmudict.txt', 'relax R IH0 L AE1 K S\ndetainee D IY2 T EY0 N IY1');
    fs.writeFileSync('/top10k.txt', 'detainee\nrelax');
    fs.writeFileSync('/nouns.txt', 'detainee');
    fs.writeFileSync('/verbs.txt', 'relax');

    const result = getAllWords('/cmudict.txt', '/top10k.txt', '/nouns.txt', '/verbs.txt', fs);

    expect(result).toEqual([
      {
        word: 'relax',
        stress: 'AE',
        position: 0,
        before: 'L',
        after: 'K S',
        syllables: 2,
        rank: 2,
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
        rank: 1,
        noun: true,
        verb: false,
      },
    ]);
  });
});
