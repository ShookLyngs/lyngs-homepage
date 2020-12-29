import qs from 'qs';

/**
 * Create web-link that contains query
 * @param {string} href
 * @param {object} query
 * @returns {string}
 */
export const createLink = (href, query = {}) =>
  Object.keys(query).length ? `${href}?${qs.stringify(query)}` : href;