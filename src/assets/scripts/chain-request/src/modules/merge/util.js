// check-is(Object)
export const isObject = target => {
  console.log(target, isProxy(target));
  return Object.prototype.toString.call(target) === '[object Object]' && !isProxy(target);
}

// check-is(Array)
export const isArray = target => Array.isArray(target);

// check-is(Set)
export const isSet = target => target instanceof Set;

// check-is(Map)
export const isMap = target => target instanceof Map;

// check-is(Proxy)
export const isProxy = target => {
  try {
    postMessage(target, "*");
  } catch (error) {
    return error && error.code === 25; // DATA_CLONE_ERR
  }
  return false;
}

// check is certain type
export const isType = (target, type) => {
  return {
    object: isObject,
    array: isArray,
    set: isSet,
    map: isMap,
  }?.[type]?.(target) ?? false;
};

// upper-case the first letter of type string
export const formatType = (type) => {
  const array = type.split('');
  array[0] = array[0].toUpperCase();
  return array.join('');
};

// throw a type error
export const typeError = (value, type) => new Error(`Type-Error: ${value} is not an instance of ${formatType(type)}`);