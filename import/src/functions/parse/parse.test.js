import { wordAttributes, allWordAttributes } from './parse';

const line1 = 'relax R IH0 L AE1 K S';
const line2 = 'affiliated AH0 F IH1 L IY0 EY2 T IH0 D';
const line3 = 'detainee D IY2 T EY0 N IY1';
const line4 = 'accident AE1 K S AH0 D AH0 N T';
const line5 = 'coincidence K OW0 IH1 N S IH0 D AH0 N S';

describe('test word attribute', () => {
  it('returns the word from CMU line parts', () => {
    expect(wordAttributes(line1).word).toEqual('relax');
  });
});

describe('test stressedVowel', () => {
  it('returns the stress from CMU line parts given the stress index', () => {
    expect(wordAttributes(line1).stress).toEqual('AE');
    expect(wordAttributes(line2).stress).toEqual('IH');
    expect(wordAttributes(line3).stress).toEqual('IY');
    expect(wordAttributes(line4).stress).toEqual('AE');
    expect(wordAttributes(line5).stress).toEqual('IH');
  });
});

describe('test stressedVowelPosition', () => {
  it('returns the position of the stressed syllable', () => {
    expect(wordAttributes(line1).position).toEqual(0);
    expect(wordAttributes(line2).position).toEqual(3);
    expect(wordAttributes(line3).position).toEqual(0);
    expect(wordAttributes(line4).position).toEqual(2);
    expect(wordAttributes(line5).position).toEqual(2);
  });
});

describe('test beforeStressedVowel', () => {
  it('returns the consonent before the stressed vowel', () => {
    expect(wordAttributes(line1).before).toEqual('L');
    expect(wordAttributes(line2).before).toEqual('F');
    expect(wordAttributes(line3).before).toEqual('N');
    expect(wordAttributes(line4).before).toEqual('');
    expect(wordAttributes(line5).before).toEqual('');
  });
});

describe('test afterStressedVowel', () => {
  it('returns the rest of the CMU line after the stressed vowel', () => {
    expect(wordAttributes(line1).after).toEqual('K S');
    expect(wordAttributes(line2).after).toEqual('L IY0 EY2 T IH0 D');
    expect(wordAttributes(line3).after).toEqual('');
    expect(wordAttributes(line4).after).toEqual('K S AH0 D AH0 N T');
    expect(wordAttributes(line5).after).toEqual('N S IH0 D AH0 N S');
  });
});

describe('test syllableCount', () => {
  it('returns the syllable count', () => {
    expect(wordAttributes(line1).syllables).toEqual(2);
    expect(wordAttributes(line5).syllables).toEqual(4);
  });
});

const wordAttributes1 = {
  word: 'relax',
  stress: 'AE',
  position: 0,
  before: 'L',
  after: 'K S',
  syllables: 2,
};
const wordAttributes2 = {
  word: 'affiliated',
  stress: 'IH',
  position: 3,
  before: 'F',
  after: 'L IY0 EY2 T IH0 D',
  syllables: 5,
};
const wordAttributes3 = {
  word: 'detainee',
  stress: 'IY',
  position: 0,
  before: 'N',
  after: '',
  syllables: 3,
};
const wordAttributes4 = {
  word: 'accident',
  stress: 'AE',
  position: 2,
  before: '',
  after: 'K S AH0 D AH0 N T',
  syllables: 3,
};
const wordAttributes5 = {
  word: 'coincidence',
  stress: 'IH',
  position: 2,
  before: '',
  after: 'N S IH0 D AH0 N S',
  syllables: 4,
};

describe('test wordAttributes', () => {
  it('returns an object containing all interesting word attributes from a CMU line', () => {
    expect(wordAttributes(line1)).toEqual(wordAttributes1);
  });
});

describe('test allWordAttributes', () => {
  it('returns an array of word attribute objects with an entry for each line', () => {
    expect(allWordAttributes(line1)).toEqual([wordAttributes1]);
    expect(allWordAttributes(`${line1}\n${line2}\n${line3}\n${line4}\n${line5}`)).toEqual([
      wordAttributes1,
      wordAttributes2,
      wordAttributes3,
      wordAttributes4,
      wordAttributes5,
    ]);
  });

  it('handles blank lines in the input', () => {
    expect(allWordAttributes(`\n${line1}\n\n`)).toEqual([wordAttributes1]);
  });

  it('handles unparseable lines in the input', () => {
    expect(allWordAttributes(`some guff\n${line1}\n\nsome other guff\n`)).toEqual([wordAttributes1]);
  });
});
