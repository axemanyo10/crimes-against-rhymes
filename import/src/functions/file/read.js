import * as fs from 'fs';

const linesFromFile = (filename, filesystem = fs) => {
  return filesystem.readFileSync(filename).split('\n');
};

export { linesFromFile as default };
