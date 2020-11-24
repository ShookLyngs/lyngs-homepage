import raf from 'raf';

/**
 * @description Create an throttle function using raf(requestAnimationFrame).
 * @param callback
 * @returns {throttle}
 */
export const animationFrameThrottle = (callback) => {
  let id = null;

  const event = (args = []) => () => {
    id = null;
    callback(...args);
  };

  const throttle = (...args) => {
    if (id === null) {
      id = raf(event(args));
    }
  };
  throttle.cancel = () => raf.cancel(id);

  return throttle;
};