const formatStyle = (string) => {
  const newString = string
    .replace(/"/g, '') // removing quotes
    .replace(/,/g, '\n') // each key from new line
    .replace('{', '{\n') // brackets on new lines
    .replace('}', '\n}'); // brackets on new lines
  return newString;
};

export default formatStyle;
