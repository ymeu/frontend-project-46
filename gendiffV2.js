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
  // parsing json to JS object
  const data1 = getJSobject(filepath1);
  const data2 = getJSobject(filepath2);

  // getting entries and sorting them alphabatically
  const entries1 = _.sortBy(Object.entries(data1), [0]);
  const entries2 = _.sortBy(Object.entries(data2), [0]);

  // inner function
  const iter = (currentValue) => {
    if (currentValue !== undefined && !_.isObject(currentValue)) {
      return ` ${currentValue}`;
    }

    const result = {};
    const isKeyPresent = (key, entries) => _.some(entries, (entry) => entry[0] === key);

    for (const [key1, value1] of entries1) {
      if (isKeyPresent(key1, entries2)) {
        if (data1[key1] === data2[key1]) {
          result[`    ${key1}`] = iter(value1);
        } else {
          result[`  - ${key1}`] = iter(value1);
          result[`  + ${key1}`] = iter(data2[key1]);
        }
      } else {
        result[`  - ${key1}`] = iter(value1);
      }
    }

    for (const [key2, value2] of entries2) {
      if (!isKeyPresent(key2, entries1)) {
        result[`  + ${key2}`] = iter(value2);
      }
    }

    return makeString(result);
  };
  return iter();
};

export default genDiff;
