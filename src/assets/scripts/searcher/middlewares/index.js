import calculator from './calculator';

// Index of items will effect how list eventually display.
// Item with the Smallest index has the highest render-level.
const sorted = [
  calculator,
];

export default sorted;
export {
  sorted as middlewares,
  calculator,
};