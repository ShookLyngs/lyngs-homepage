// util/common/plugin

/**
 * make a vue-component installable
 * @param component {Object}
 * @param args {Object}
 * @param args.uses {Object[]}
 * @returns {Object}
 */
export const defineInstallableComponent = (component, { uses = [] } = {}) => {
  component.install = (app) => {
    app.component(component.displayName ?? component.name, component);

    if (Array.isArray(uses)) {
      uses.forEach((injection) => app.use(injection));
    }
  }
  return component;
};