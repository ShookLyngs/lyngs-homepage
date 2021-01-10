import { addThemes, useTheme } from './util';

addThemes([
  require('./themes/light'),
  require('./themes/dark'),
]);

export default () => useTheme('light');
export * from './util';
