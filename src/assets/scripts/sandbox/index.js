let iframe;
import resource from './iframes/eval.html';

const createIframe = () => {
  //const resource = require('./iframes/eval.html');

  /*const element = document.createElement(`
    <iframe sandbox="allow-scripts" src="./iframes/eval.html"></iframe>
  `);*/
  console.log('data:text/html, ' + btoa(resource));

  const element = document.createElement('iframe');
  element.setAttribute('sandbox', 'allow-scripts');
  element.style.display = 'none';
  element.src = 'data:text/html, ' + btoa(resource);

  document.body.appendChild(element);

  return element;
};

export default (() => {
  if (!iframe) {
    iframe = createIframe();
  }
  return iframe;
})();