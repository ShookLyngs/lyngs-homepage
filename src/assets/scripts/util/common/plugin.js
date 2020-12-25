// util/common/plugin

/**
 * make a vue-component installable
 * @param component {Object}
 * @param args {Object}
 * @param args.uses {Object[]}
 * @returns {Object}
 */
export const defineInstallableComponent = (component, { uses = [], properties = {} } = {}) => {
  // Build install method for component.
  component.install = (app) => {
    app.component(component.displayName ?? component.name, component);

    if (Array.isArray(uses)) {
      uses.forEach(use => app.use(use));
    }
  }
  // Add properties into component.
  if (Object.keys(properties).length) {
    Object.keys(properties).forEach(key => component[key] = properties[key]);
  }

  return component;
};