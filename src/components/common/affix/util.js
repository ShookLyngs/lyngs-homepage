import { getTargetRect } from '<util>/common/dom';

/**
 * @description Get scroll object from DOM target.
 * @param target
 * @returns {{scrollLeft: (number), scrollTop: (number)}}
 */

export const getScroll = (target) => {
  return {
    scrollTop: typeof target.pageYOffset === 'number'
      ? target.pageYOffset : document.documentElement.scrollTop,
    scrollLeft: typeof target.pageXOffset === 'number'
      ? target.pageXOffset : document.documentElement.scrollLeft,
  };
};

/**
 * @description Get offset(top/left) from DOM target.
 * @param target
 * @returns {{top: number, left: number}}
 */

export const getOffset = (target, wrap) => {
  const rect = getTargetRect(target);

  const {
    scrollTop, scrollLeft
  } = getScroll(wrap);

  const {
    clientTop, clientLeft
  } = document.body;

  return {
    top: (rect?.top ?? 0) + scrollTop - clientTop,
    left: (rect?.left ?? 0) + scrollLeft - clientLeft,
  };
};