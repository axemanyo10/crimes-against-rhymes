import { readFileSync } from 'fs';

const linesFromFile = (filename) => {
  return readFileSync(filename).split('\n');
};

export { linesFromFile as default };
