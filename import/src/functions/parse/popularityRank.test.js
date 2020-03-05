import wordPopularityRank from './popularityRank';

describe('word popularity rank', () => {
  it('returns the popularity ranking for a word', () => {
    expect(wordPopularityRank('hi', ['hi', 'there', 'buddy'])).toEqual(1);
    expect(wordPopularityRank('buddy', ['hi', 'there', 'buddy'])).toEqual(3);
  });

  it('returns null for word not found', () => {
    expect(wordPopularityRank('buddy', ['foo', 'bar'])).toEqual(null);
  });
});
