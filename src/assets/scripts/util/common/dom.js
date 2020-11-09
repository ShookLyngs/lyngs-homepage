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

/**
 * get width/height/top/bottom/left/right of target
 * @param target
 * @returns {{top: number, left: number, bottom: number, width: number, right: number, height: number}|DOMRect}
 */
export const getTargetRect = (target) => {
  if (target !== window) {
    return target.getBoundingClientRect();
  } else {
    return {
      top: 0,
      left: 0,
      right: window.innerWidth,
      width: window.innerWidth,
      bottom: window.innerHeight,
      height: window.innerHeight,
    };
  }
};

/**
 * add event-listener to a target, then returns an object that contains method to remove-listener
 * @param target - listen target
 * @param type - event type
 * @param callback - trigger method
 * @param options - add listener options
 * @returns {{remove: remove}}
 */
export const addEventListener = (target, type, callback, options = void 0) => {
  if (!target?.addEventListener) {
    throw Error("target is not a listenable object");
  }

  target.addEventListener(type, callback, options);

  return {
    remove: () => {
      if (target.removeEventListener) {
        target.removeEventListener(type, callback);
      }
    },
  };
};