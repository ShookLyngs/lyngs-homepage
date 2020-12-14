/**
 * replace input content, to make eval() run normally.
 * @param {string} input
 * @returns {string}
 */
export const formatInput = (input) => {
  const replaces = [
    { target: /(=|\s+?)/g, replacement: '' },
    { target: /（/g, replacement: '(' },
    { target: /）/g, replacement: ')' },
    { target: /\?$/g, replacement: '' },
  ];

  return replaces.reduce(
    (collection, rule) =>
      collection.replace(rule.target, rule.replacement),
    input
  );
};

/**
 * check if input content is a formula
 * @param {string} input
 * @returns {boolean}
 */
export const isFormula = (input) =>
  /^((\d+)|((-?\d+)(\.\d+)))[+\-*/%]((\d+)|((-?\d+)(\.\d+)))([+\-*/%]((\d+)|((-?\d+)(\.\d+))))*(=?)$/
  .test(input);