// eslint-disable-next-line import/no-extraneous-dependencies
import * as yaml from 'js-yaml';

const parseFile = (fileContent, fileType) => {
  if (fileType === '.json') {
    return JSON.parse(fileContent);
  }
  if (fileType === '.yml' || fileType === '.yaml') {
    return yaml.load(fileContent);
  }
  return console.error('Unknown file format');
};

export default parseFile;
