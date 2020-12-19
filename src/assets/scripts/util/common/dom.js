// util/common/dom

/**
 * Find DomNode out of vue-instance/vue-ref and all
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
 * Get width/height/top/bottom/left/right of target
 * @param target
 * @returns {{top: number, left: number, bottom: number, width: number, right: number, height: number}|DOMRect}
 */
export const getTargetRect = (target) => {
  if (target !== window) {
    return target?.$el?.getBoundingClientRect?.()
      ?? target?.getBoundingClientRect?.()
      ?? null;
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
 * Add event-listener to a target, then returns an object that contains method to remove-listener
 * @param target {Object} - listen target
 * @param type {string} - event type
 * @param event {Function} - trigger method
 * @param options {Object|Boolean} - add listener options
 * @returns {{remove: Function}}
 */
export const on = (target, type, event, options = false) => {
  if (!target?.addEventListener) {
    throw Error("target is not a listenable object");
  }

  target.addEventListener(type, event, options);

  return {
    remove: () => {
      if (target.removeEventListener) {
        target.removeEventListener(type, event);
      }
    },
  };
};

export const off = (target, type, event) => {
  if (target?.removeEventListener) {
    target.removeEventListener(type, event);
  }
};

/**
 * A polyfill, if a component was imported by Vue.defineAsyncComponent(),
 * then we cannot access ref of that component directly.
 * Instead of access directly, we have to access ref in a form of `this.$refs[refName].$refs[refName]`.
 * @param caller {Object}
 * @param refName {string}
 * @returns {Object|null}
 */

export const accessRef = (caller, refName) => {
  if (caller?.$refs?.[refName]?.$refs?.[refName]) {
    return caller.$refs[refName].$refs[refName];
  } else {
    return caller.$refs?.[refName];
  }
};

/**
 * Set classes for parent, or set to all parents.
 * @param type {'add'|'remove'} - action type
 * @param classes {string|string[]} - classes you wanna add or remove
 * @param each {boolean} - is set classes on each generation of parents
 * @param element {HTMLElement} - DOM target
 */

export const setParentClass = (type, classes = [], each = false,element = document.body) => {
  if (!Array.isArray(classes)) {
    classes = typeof classes === 'string' ? classes.split(' ') : [ classes ];
  }

  const body   = document.body;
  let   parent = (element !== body && element.parentElement) || element;

  const process = () => {
    if (type === 'add') {
      classes.forEach(item => parent.classList.add(item));
    } else if (type === 'remove') {
      classes.forEach(item => parent.classList.remove(item));
    }
  };

  if (each) {
    while(parent) {
      process();
      parent = parent.parentElement ?? null;
    }
  } else {
    process();
  }
};


let scrollBarWidth = null;
/**
 * Get width of native scrollbar.
 * @returns {number|null}
 */
export const getScrollBarWidth = () => {
  if (scrollBarWidth !== null) {
    return scrollBarWidth;
  }

  const outer = document.createElement('div');
  outer.className = 'ls-scrollbar__wrap';
  outer.style.visibility = 'hidden';
  outer.style.width = '100px';
  outer.style.position = 'absolute';
  outer.style.top = '-9999px';
  document.body.appendChild(outer);

  const widthNoScroll = outer.offsetWidth;
  outer.style.overflow = 'scroll';

  const inner = document.createElement('div');
  inner.style.width = '100%';
  outer.appendChild(inner);

  const widthWithScroll = inner.offsetWidth;
  outer.parentNode.removeChild(outer);
  scrollBarWidth = widthNoScroll - widthWithScroll;

  return scrollBarWidth;
};