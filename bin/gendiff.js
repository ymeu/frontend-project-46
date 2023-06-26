#!/usr/bin/env node

// eslint-disable-next-line import/no-extraneous-dependencies
import { program } from 'commander';
import fs from 'fs';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .arguments('[filepath1] [filepath2]')
  .option('-f, --format <type>', 'output format')
  .parse(process.argv);

// program.parse();

const [filepath1, filepath2] = program.args;

const data1 = fs.readFileSync(filepath1, 'utf-8');
console.log(data1);

if (filepath2) {
  const data2 = fs.readFileSync(filepath2, 'utf-8');
  console.log(data2);
}

const genDiff = (filepath1, filepath2) => {
// Implementation to generate the difference between the files
// and return it as a string
};

export default genDiff;

// gendiff __fixtures__/file1.json __fixtures__/file2.json
// gendiff __fixtures__/file1.json
// gendiff file1.json file2.json
