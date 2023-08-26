/* eslint-disable no-restricted-syntax */
import fs from 'fs';
import * as path from 'path'; // Import the 'path' module
import _ from 'lodash';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as yaml from 'js-yaml';
// const fs   = require('fs');

const getFileData = (filepath) => {
  // resolved relative paths to absolute paths
  const workingDirectory = process.cwd();
  const resolvedPath = path.resolve(workingDirectory, '__fixtures__', filepath);

  // read contents of the files and parse them to return a JavaScript object
  const fileType = path.extname(filepath);
  return fileType === '.json'
    ? JSON.parse(fs.readFileSync(resolvedPath, 'utf-8'))
    : yaml.load(fs.readFileSync(resolvedPath, 'utf8'));
};

const makeString = (json) => {
  const stringJSON = JSON.stringify(json)
    .replace(/"/g, '') // removing quotes
    .replace(/,/g, '\n') // each key from new line
    .replace('{', '{\n') // brackets on new lines
    .replace('}', '\n}'); // brackets on new lines

  return stringJSON;
};

const genDiff = (filepath1, filepath2) => {
  const result = {};
  const data1 = getFileData(filepath1);
  const data2 = getFileData(filepath2);

  // getting keys and sorting them alphabatically
  const keys1 = _.sortBy(_.keys(data1));
  const keys2 = _.sortBy(_.keys(data2));

  for (const key1 of keys1) {
    if (keys2.includes(key1)) {
      if (data1[key1] === data2[key1]) {
        result[`    ${key1}`] = ` ${data1[key1]}`;
      } else {
        result[`  - ${key1}`] = ` ${data1[key1]}`;
        result[`  + ${key1}`] = ` ${data2[key1]}`;
      }
    } else {
      result[`  - ${key1}`] = ` ${data1[key1]}`;
    }
  }

  for (const key2 of keys2) {
    if (!keys1.includes(key2)) {
      result[`  + ${key2}`] = ` ${data2[key2]}`;
    }
  }

  return makeString(result);
};

export default genDiff;
