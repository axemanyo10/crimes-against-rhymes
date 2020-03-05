const isValidCMULine = (line) => /^[-a-z'.]+(\([0-9]\))? [ A-Z012]+$/.test(line);

const cmuLineParts = (line) => line.split(' ');

const word = (parts) => parts[0];

const stressedVowelIndex = (parts) => parts.findIndex((x) => /[A-Z]+1/.test(x));

const stressedVowel = (parts, index) => parts[index].slice(0, -1);

const vowelParts = (array) => array.filter((x) => /[A-Z]+[012]/.test(x));

const stressedVowelPosition = (parts, index) => {
  const partsAfterStressedVowel = parts.slice(index + 1);
  return vowelParts(partsAfterStressedVowel).length;
};

const beforeStressedVowel = (parts, index) => {
  if (index === 1 || /[012]/.test(parts[index - 1])) {
    return '';
  }
  return parts[index - 1];
};

const afterStressedVowel = (parts, index) => parts.slice(index + 1).join(' ');

const syllableCount = (parts) => vowelParts(parts).length;

const wordAttributes = (line) => {
  const parts = cmuLineParts(line);
  const index = stressedVowelIndex(parts);
  return {
    word: word(parts),
    stress: stressedVowel(parts, index),
    position: stressedVowelPosition(parts, index),
    before: beforeStressedVowel(parts, index),
    after: afterStressedVowel(parts, index),
    syllables: syllableCount(parts),
  };
};

const allWordAttributes = (lineArray) => {
  const validLines = lineArray.filter((x) => isValidCMULine(x));
  return validLines.map((line) => wordAttributes(line));
};

export { wordAttributes, allWordAttributes };
