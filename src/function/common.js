import HTMLReactParser from 'html-react-parser';

/**
 * Convert Carriage Return and Line Feed into <br> tag.
 * @param {string} text The row text
 * @returns {void | string | never} The formatted text
 */
export const returnCodeToBr = (text) => {
  if (text === '') {
    return text;
  }
  return HTMLReactParser(text.replace(/\r?\n/g, '<br/>'));
};
