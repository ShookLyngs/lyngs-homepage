
export const createBangMatcher = (tags, flags = 'i') => {
  const replaceNames = replace =>
    new RegExp(`^(?:!)(?:${replace})(?:(?:\\s+)(.+))$`, flags);

  if (Array.isArray(tags)) {
    return replaceNames(tags.join('|'));
  }
  if (typeof tags === 'string') {
    return replaceNames(tags);
  }

  throw new Error(`names is supposed to be typeof Array or String`);
};

export const createBangContent = (input, tags) => {
  const matchName = createBangMatcher(tags).exec(input);
  return matchName && matchName[1] || input;
};

export const isBangInput = (input, tags) => {
  const matchName = createBangMatcher(tags).exec(input);
  return !!(matchName?.length && matchName?.[1]);
};