// assets/scripts/util

// return filename without extension.
// if filename is like '.eslintrc', then return 'eslintrc' itself.
const filterMapName = (path) => {
  const filename = path.split(/[\\/.]/g),
        filtered = filename.reduce((result, value, index) => {
          if (value && (!result.length || index + 1 < filename.length)) {
            result.push(value);
          }
          return result;
        }, []);
  return {
    chain: filtered,
    digger: filtered.join('.'),
    extension: filename[filename.length - 1],
  };
};

// return regular to fits 'or' situation.
const orRegular = (extensions) =>
  Array.isArray(extensions) ? `(${ extensions.join('|') })` : extensions;

// return filter regular, for exclude of include situations.
const filterRegular = (names, extensions) => {
  const namesOnly = names ?? '',
        namesOr   = names ? names + '$|' : '',
        nameEnd   = names ? names + '$' : '',
        extension = extensions ? '\\.' + extensions : '';

  return new RegExp(extensions ? `(${namesOr}${namesOnly}${extension}$)` : nameEnd);
};

// default filter options
const defaultFilterOptions = () => {
  return {
    excludeExtension: '(.[^./])+',
    includeExtension: '(.[^./])+',
    excludeName: 'index',
    includeName: '',
  };
};

// dig object-type value
const digger = (target, dig, value) => {
  const list  = dig.split('.');
  let   outer = Object.assign({}, target) ?? {},
        stand = outer;

  list.forEach((key, index) => {
    if (!stand?.[key]) {
      stand[key] = {};
    }
    if (index + 1 < list.length) {
      stand = stand[key];
    } else {
      stand[key] = value;
    }
  });
  return outer;
};

// get files in ./ and translate them to Object with layers.
// files- pass require result like: require.context('./', true, /\.(.[^./])+$/)
const filter = function(files, config = defaultFilterOptions()) {
  const {
          excludeExtension, includeExtension,
          excludeName, includeName,
        } = Object.assign(defaultFilterOptions(), config);
  const excludeFilter = filterRegular(orRegular(excludeName), orRegular(excludeExtension)),
        includeFilter = filterRegular(orRegular(includeName), orRegular(includeExtension));
  let   map           = {};

  files.keys().forEach(path => {
    const isExclude = excludeName && excludeExtension ? excludeFilter.test(path) : false,
          isInclude = includeName && includeExtension ? includeFilter.test(path) : true;

    if (isExclude || !isInclude) return;

    const name = filterMapName(path);
    map = digger(map, name.digger, files(path));
  });
  console.log(map);
  return map;
};

// export module
export default filter;
export {
  filter
};