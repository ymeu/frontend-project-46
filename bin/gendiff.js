#!/usr/bin/env node

// eslint-disable-next-line import/no-extraneous-dependencies
import { program } from 'commander';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0');

program.parse();

const genDiff = (filepath1, filepath2) => {
// Implementation to generate the difference between the files
// and return it as a string
};

export default genDiff;