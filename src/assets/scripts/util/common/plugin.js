// util/common/plugin

/**
 * make a vue-component installable
 * @param component
 * @returns {*}
 */
export const defineInstallableComponent = (component) => {
  component.install = (app) => {
    app.component(component.displayName ?? component.name, component);
  }
  return component;
};