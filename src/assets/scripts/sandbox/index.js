import resource from './iframes/eval.html';

let iframe;
const queue = [];

const createToken = () => Math.random().toString(36).substring(2, 10);

const listen = (context) => queue.push(context);

const trigger = (property, ...params) => {
  if (!queue.length) return;

  const context = queue.pop();
  if (context[property]) {
    context[property](...params);
  }

  trigger(property, ...params);
};

const createIframe = () => {
  const element = document.createElement('iframe'),
        token   = createToken();

  element.setAttribute('sandbox', 'allow-scripts');
  element.style.display = 'none';
  element.src = 'data:text/html;base64, ' + btoa(resource);
  element.id = token;

  document.body.appendChild(element);

  const onMessage = (event) => {
    if (event.origin === 'null' && element.contentWindow === event.source) {
      trigger('resolve', event.data);
    }
  };
  window.addEventListener('message', onMessage);

  return {
    element,
    id: token,
    postMessage(message) {
      return new Promise((resolve, reject) => {
        listen({ resolve, reject });
        element.contentWindow.postMessage(message, '*');
      });
    },
    remove() {
      window.removeEventListener('message', onMessage);
      document.body.removeChild(element);
    },
  };
};

export default (() => {
  if (!iframe) {
    iframe = createIframe();
  }
  return iframe;
})();