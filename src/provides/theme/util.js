const store = {};
let   activated = null;

export const createTheme = module => {
  const theme = module.default ?? module;
  return theme instanceof Function ? theme() : theme;
};

export const addTheme = theme => {
  if (!theme.name) theme = createTheme(theme);
  store[theme.name] = theme;
};

export const addThemes = themes =>
  themes.forEach(theme => addTheme(theme));

export const useTheme = (theme, resetOnError = true) => {
  if (typeof theme === 'string') theme = store[theme];
  if (!theme) return console.error(`Theme data not found: ${theme}`);

  try {
    const root = document.documentElement;
    const map  = createFlatMap(theme.variables);

    Object.keys(map).forEach(key => {
      root.style.setProperty(createVarName(key), map[key]);
    });

    activated = theme;
  } catch(error) {
    console.error(`Unhandled Error during switching theme: `, error);
    if (resetOnError && activated) useTheme(activated, false);
  }
};

export const createVarName = name =>
  name.startsWith('--') ? name : `--${name}`;

export const createFlatMap = (object, inherit = [], reduce = {}) => {
  return Object.keys(object).reduce((collection, key) => {
    const value = object[key];
    const names = [].concat(inherit, [ key ]);

    if (Object.prototype.toString.call(value) === '[object Object]') {
      collection = createFlatMap(value, names, reduce);
    } else {
      collection[names.join('-')] = value;
    }

    return collection;
  }, reduce);
};