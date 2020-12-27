import calculator from './calculator';
import google from './google';
import baidu from './baidu';

// - Index of defaultSorts
// Index of items will effect how list eventually display.
// Item with the Smallest index in defaultSorts list, has the highest render-level.

// - Index in middleware properties
// Middleware can actually contain index property to reset its own index.
// For index property in middleware, the bigger the topper.

const defaultSorts = [
  calculator,
  google,
  baidu,
];

export default defaultSorts;
export {
  defaultSorts as middlewares,
  calculator,
  google,
};