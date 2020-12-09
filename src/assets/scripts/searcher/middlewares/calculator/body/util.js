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