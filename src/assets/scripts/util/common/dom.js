// util/common/dom

/**
 * find DomNode out of vue-instance/vue-ref and all
 * @param instance - vue-instance/vue-ref
 * @returns {*}
 */
export const findDOMNode = (instance) => {
  let node = instance && (instance.$el || instance);
  while (node && !node.tagName) {
    node = node.nextSibling;
  }
  return node;
};