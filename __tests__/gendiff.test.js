import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../gendiff.js';
import testData from '../testData.js';
// eslint-disable-next-line import/order
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const expected = fs.readFileSync(getFixturePath('expected.txt'), 'utf-8');

test('JSONgenDiff', () => {
  const actual = genDiff(
    'file1.json',
    'file2.json',
  );
  expect(actual).toEqual(expected);
});

test('YAMLgenDiff', () => {
  const actual = testData('expected.txt');
  expect(actual).toEqual(expected);
});

// npm run test -- --silent=false
// console.log('actual', actual);
// console.log('expected', expected);
