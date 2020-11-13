// find or update property inside of a object/array

// symbol(empty-update)
const EmptyUpdate = Symbol('empty-update');

// check if target is empty
const isEmpty = target => target === void 0 || target === null;

// check(is-string-quoted)
const isQuoted = target => /^('.+'|".+")$/g.test(target);

// check(is-target-number)
const isNumber = target => !Number.isNaN(+target) && Number.isFinite(+target);

// filter(split-finder)
const splitFinder = find => find.split(/(?:\\]\[|\]\.|\.|\[|\])+?/g);

// filter(exclude-empty-item-in-array)
const removeEmptyInArray = array => array.filter(value => !!value);

// filter(remove-quotes-inside-of-string)
const removeQuotesInString = string => string.replace(/(['"])/g, '');

export const digger = (
  caller,
  find,
  update = EmptyUpdate,
  {
    untie = false,
    extend = false,
  } = {}
) => {
  // when empty-error has triggered,
  // return undefined to stand the result;
  if (isEmpty(caller) || isEmpty(find)) return void 0;

  const classified = removeEmptyInArray(splitFinder(find));
  let   stand      = caller,
        index      = 0;

  for (index = 0; index < classified.length; index++) {
    let current = classified[index];

    if (isQuoted(current)) {
      current = removeQuotesInString(current);
    } else if (isNumber(current)) {
      current = Number(current);
    }
    if (isEmpty(stand[current])) {
      if (extend && update !== EmptyUpdate && index + 1 < classified.length) {
        const next = stand[current + 1];
        stand[current] = isQuoted(next) ? {} : isNumber(next) ? [] : {};
      } else if (!extend || update === EmptyUpdate) {
        break;
      }
    }
    if (update !== EmptyUpdate && index + 1 === classified.length) {
      stand[current] = untie && typeof update === 'function' ? update(stand[current]) : update;
    }

    stand = stand[current];
  }

  return index === classified.length ? stand : void 0;
};