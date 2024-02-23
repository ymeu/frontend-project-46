/* eslint-disable no-restricted-syntax */
import fs from 'fs';
import * as path from 'path'; // Import the 'path' module
import _ from 'lodash';
import parseFile from './parsers.js';

const getJSobject = (filepath) => {
  // Get the absolute path of the current working directory
  const workingDirectory = process.cwd();
  // Resolve the filepath using the absolute path of the working directory
  const resolvedPath = path.resolve(workingDirectory, '__fixtures__', filepath);
  // Read the content of the file
  const fileContent = fs.readFileSync(resolvedPath, 'utf-8');
  // Determine the file type based on the extension
  const fileType = path.extname(filepath);
  // Parse the file content based on the file type
  return parseFile(fileContent, fileType);
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

  // parsing json to JS object
  const data1 = getJSobject(filepath1);
  const data2 = getJSobject(filepath2);

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