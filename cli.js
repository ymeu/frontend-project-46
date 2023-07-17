#!/usr/bin/env node

// eslint-disable-next-line import/no-extraneous-dependencies
import { program } from 'commander';
import fs from 'fs';
import * as path from 'path'; // Import the 'path' module

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .arguments('[filepath1] [filepath2]')
  .option('-f, --format <type>', 'output format')
  .parse(process.argv);

// program.parse();

const [filepath1, filepath2] = program.args;

// resolved relative paths to absolute paths
const workingDirectory = process.cwd();
const resolvedPath1 = path.resolve(workingDirectory, filepath1);
const resolvedPath2 = filepath2 ? path.resolve(workingDirectory, filepath2) : undefined;

// read and log contents of the files
const data1 = fs.readFileSync(resolvedPath1, 'utf-8');
console.log(data1);

if (filepath2) {
  const data2 = fs.readFileSync(resolvedPath2, 'utf-8');
  console.log(data2);
}

const genDiff = (filepath1, filepath2) => {
// Implementation to generate the difference between the files
// and return it as a string
};

export default genDiff;

// list of possible commands to read the contents of the files
// gendiff __fixtures__/file1.json __fixtures__/file2.json
// gendiff __fixtures__/file1.json
// gendiff file1.json file2.json
// gendiff /Users/alexey/Documents/dev/hexlet/frontend-project-46/__fixtures__/file1.json
// gendiff /Users/alexey/Documents/dev/hexlet/frontend-project-46/__fixtures__/file2.json
// gendiff /Users/alexey/Documents/dev/hexlet/frontend-project-46/__fixtures__/file1.json /Users/alexey/Documents/dev/hexlet/frontend-project-46/__fixtures__/file2.json