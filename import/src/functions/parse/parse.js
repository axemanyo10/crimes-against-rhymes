export const cmuLineParts = (line) => line.split(' ');

export const word = (parts) => parts[0];

export const stressedVowelIndex = (parts) => parts.findIndex((x) => /[A-Z]+1/.test(x));

export const stressedVowel = (parts, index) => parts[index].slice(0, -1);

export const stressedVowelPosition = (parts, index) => {
  const partsAfterStressedVowel = parts.slice(index + 1);
  const vowelParts = (array) => array.filter((x) => /[A-Z]+[012]/.test(x));
  return vowelParts(partsAfterStressedVowel).length;
};

export const beforeStressedVowel = (parts, index) => {
  if (index === 1 || /[012]/.test(parts[index - 1])) {
    return '';
  }
  return parts[index - 1];
};

export const afterStressedVowel = (parts, index) => parts.slice(index + 1).join(' ');

export const syllableCount = (parts) => parts.filter((x) => /[A-Z]+[012]/.test(x)).length;

export const wordAttributes = (line) => {
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

export const allWordAttributes = (lines) => {
  const lineArray = lines.split(/\n/);
  return lineArray.map((line) => wordAttributes(line));
};
