import Icon from '<components>/common/icon';
import loading from '<components>/common/loading';
import Clipboard from '<components>/common/clipboard';
import VirtualPopper from '<components>/common/virtual-popper';

export default {
  install: (app) => {
    app.use(Icon);
    app.use(loading);
    app.use(Clipboard);
    app.use(VirtualPopper);
  }
};