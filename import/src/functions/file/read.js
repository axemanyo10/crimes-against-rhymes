import * as fs from 'fs';

const linesFromFile = (filename, filesystem = fs) => {
  return filesystem.readFileSync(filename, 'utf8').split('\n');
};

export { linesFromFile as default };
