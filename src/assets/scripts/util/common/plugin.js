// util/common/plugin

/**
 * make a vue-component installable
 * @param component
 * @returns {*}
 */
export const defineInstallableComponent = (component) => {
  component.install = (app) => {
    app.use(component.displayName ?? component.name, component);
  }
  return component;
};