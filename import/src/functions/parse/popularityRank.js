const wordPopularityRank = (word, wordsOrderedByPopularity) => {
  const index = wordsOrderedByPopularity.findIndex((x) => x === word);
  return index >= 0 ? index + 1 : null;
};

export default wordPopularityRank;
