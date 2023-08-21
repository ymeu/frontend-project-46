import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../gendiff.js';
// eslint-disable-next-line import/order
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const expected = fs.readFileSync(getFixturePath('expected.txt'), 'utf-8');

test('genDiff', () => {
  const actual = genDiff(
    './__fixtures__/file1.json',
    './__fixtures__/file2.json',
  );
  // npm run test -- --silent=false
  // console.log('actual', actual);
  // console.log('expected', expected);
  expect(actual).toEqual(expected);
});
// });
