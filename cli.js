#!/usr/bin/env node
// eslint-disable-next-line import/no-extraneous-dependencies
import { program } from 'commander';
// eslint-disable-next-line import/extensions
import genDiff from './gendiff.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .arguments('[filepath1] [filepath2]')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2) => {
    // genDiff(filepath1, filepath2);
    console.log(genDiff(filepath1, filepath2));
  });

// parsing the data from files to makes them JSON object rather than a string
program.parse(process.argv);

// list of possible commands to read the contents of the files
// gendiff file1.json file2.json
// eslint-disable-next-line max-len
// gendiff /Users/alexey/Documents/dev/hexlet/frontend-project-46/__fixtures__/file1.json /Users/alexey/Documents/dev/hexlet/frontend-project-46/__fixtures__/file2.json
