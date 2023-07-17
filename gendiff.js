/* eslint-disable no-restricted-syntax */
import fs from 'fs';
import * as path from 'path'; // Import the 'path' module
import _ from 'lodash';

const genDiff = (filepath1, filepath2) => {
  const result = {};

  // resolved relative paths to absolute paths
  const workingDirectory = process.cwd();
  const resolvedPath1 = path.resolve(workingDirectory, filepath1);
  const resolvedPath2 = filepath2
    ? path.resolve(workingDirectory, filepath2)
    : undefined;

  // read contents of the files and parse them to return as string rathen than a JSON object
  const data1 = JSON.parse(fs.readFileSync(resolvedPath1, 'utf-8'));
  const data2 = JSON.parse(fs.readFileSync(resolvedPath2, 'utf-8'));

  // sorting keys alphabatically
  const keys1 = _.sortBy(_.keys(data1));
  const keys2 = _.sortBy(_.keys(data2));

  for (const key1 of keys1) {
    if (keys2.includes(key1)) {
      if (data1[key1] === data2[key1]) {
        result[key1] = data1[key1];
      } else {
        result[`-${key1}`] = data1[key1];
        result[`+${key1}`] = data2[key1];
      }
    } else {
      result[`-${key1}`] = data1[key1];
    }
  }

  for (const key2 of keys2) {
    if (!keys1.includes(key2)) {
      result[`+${key2}`] = data2[key2];
    }
  }

  console.log(result);
};

export default genDiff;
