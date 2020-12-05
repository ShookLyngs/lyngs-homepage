import resources from './iframes';

const sandboxes = {};

const createToken = () => Math.random().toString(36).substring(2, 10);

const listen = (promises, promise) => {
  const token = createToken();

  promises.push({
    token: token,
    promise,
  });

  return token;
};

const trigger = (promises, property, data, ...params) => {
  if (!promises || !promises.length) {
    return;
  }

  const { token } = data;

  if (!token) {
    throw new Error(`Can't find property in message data: token`);
  }

  promises = promises.filter(item => {
    if (item.token !== token) {
      return true;
    }
    if (!(item.promise[property] instanceof Function)) {
      const error = new Error(`Can't find property in promise: ${token}`);
      if (item.promise.reject instanceof Function) {
        item.promise.reject(error);
      } else {
        throw error;
      }
    }

    item.promise[property](data, ...params);

    return false;
  });

  return promises;
};

const bind = (type, callback) => {
  window.addEventListener('message', callback);
  return () => window.removeEventListener(type, callback);
};

const createElement = (name) => {
  if (!resources[name]) {
    throw new Error(`No iframe in resources: ${name}`);
  }

  const resource = resources[name],
        element  = document.createElement('iframe'),
        id       = `iframe-${createToken()}`;
  let   promises = [];

  element.setAttribute('sandbox', 'allow-scripts');
  element.style.display = 'none';
  element.src = `data:text/html;base64, ${btoa(resource)}`;
  element.id = id;

  document.body.appendChild(element);

  const postMessage = (data) => {
    return new Promise((resolve, reject) => {
      const token   = listen(promises,{ resolve, reject }),
            context = { token, ...data };

      element.contentWindow.postMessage(context, '*');
    });
  };

  const removeListener = bind('message', (event) => {
    if (event.origin === 'null' && element.contentWindow === event.source) {
      promises = trigger(promises,'resolve', event.data);
    }
  });

  const removeElement = () => {
    document.body.removeChild(element);
  };

  return {
    id,
    element,
    postMessage,
    removeListener,
    removeElement,
  };
};

const removeSandbox = (name) => {
  if (sandboxes[name]) {
    sandboxes[name] = null;
  }
};

const createSandbox = (name) => {
  if (!sandboxes[name]) {
    sandboxes[name] = createElement(name);

    sandboxes[name].remove = () => {
      sandboxes[name].removeListener();
      sandboxes[name].removeElement();
      removeSandbox(name);
    };
  }

  return sandboxes[name];
};

export default createSandbox;
export {
  createSandbox,
  removeSandbox,
};