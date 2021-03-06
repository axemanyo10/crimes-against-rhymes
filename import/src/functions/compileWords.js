import fileLines from './file/read';
import { allWordAttributes } from './parse/cmuDictionary';
import wordPopularityRank from './parse/popularityRank';

const withPopularityRank = (wordAttributesList, wordRankLines) => {
  return wordAttributesList.map((wordAttributes) => ({
    ...wordAttributes,
    rank: wordPopularityRank(wordAttributes.word, wordRankLines),
  }));
};

const withNoun = (wordAttributesList, nounLines) => {
  return wordAttributesList.map((wordAttributes) => ({
    ...wordAttributes,
    noun: nounLines.includes(wordAttributes.word),
  }));
};

const withVerb = (wordAttributesList, verbLines) => {
  return wordAttributesList.map((wordAttributes) => ({
    ...wordAttributes,
    verb: verbLines.includes(wordAttributes.word),
  }));
};

const getAllWords = (cmuFile, wordRankFile, nounFile, verbFile, filesystem) => {
  const cmuLines = fileLines(cmuFile, filesystem);
  const wordRankLines = fileLines(wordRankFile, filesystem);
  const nounLines = fileLines(nounFile, filesystem);
  const verbLines = fileLines(verbFile, filesystem);
  let wordAttributesList = allWordAttributes(cmuLines);
  wordAttributesList = withPopularityRank(wordAttributesList, wordRankLines);
  wordAttributesList = withNoun(wordAttributesList, nounLines);
  wordAttributesList = withVerb(wordAttributesList, verbLines);
  return wordAttributesList;
};

export default getAllWords;
