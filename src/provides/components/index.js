import loading from '<components>/common/loading';
import Icon from '<components>/common/icon';
import Clipboard from '<components>/common/clipboard';
import VirtualPopper from '<components>/common/virtual-popper';

export default {
  install: (app) => {
    app.use(loading);
    app.use(Icon);
    app.use(Clipboard);
    app.use(VirtualPopper);
  }
};