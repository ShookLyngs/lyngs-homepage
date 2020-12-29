export const createModules = (list) => list.reduce((collection, row) => {
  row = row?.default ?? row;

  const current = row instanceof Function ? row() : row;
  collection[current.name] = current.store ?? current;

  return collection;
}, {});