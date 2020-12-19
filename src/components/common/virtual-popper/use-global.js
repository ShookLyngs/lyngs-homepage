import component from './virtual-popper';
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

export default append;
export const useGlobalVirtualPopper = append;
export const removeGlobalVirtualPopper = remove;