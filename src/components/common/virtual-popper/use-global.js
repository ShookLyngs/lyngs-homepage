import component from './virtual-popper.js';
import { createApp } from 'vue';

const append = () => {
  const app      = createApp(component);
  const element  = document.createElement('div');

  document.body.appendChild(element);

  return {
    app,
    element,
    instance: app.mount(element),
  };
};

const remove = (app, element) => {
  app.unmount(element);
  if (document.body.contains(element)) {
    document.body.removeChild(element);
  }
};

const useGlobalVirtualPopper = () => {
  const { app, element, instance } = append();
  return {
    app,
    element,
    instance,
  };
};

export default useGlobalVirtualPopper;
export {
  useGlobalVirtualPopper,
  remove,
};