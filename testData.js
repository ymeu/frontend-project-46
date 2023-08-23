import { fileURLToPath } from 'url';
import path from 'path';
// eslint-disable-next-line import/order
import fs from 'fs';

const testData = (filename) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const getFixturePath = () => path.join(__dirname, '__fixtures__', filename);
  const result = fs.readFileSync(getFixturePath(filename), 'utf-8');

  return result;
};

export default testData;
