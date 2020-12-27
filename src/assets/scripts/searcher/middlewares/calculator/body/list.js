import { createResult } from '../../../body';
import { formatInput, isFormula } from './util';
import Clipboard from '<components>/common/clipboard';

const createListItem = ({ input, result }) => createResult({
  prefix: {
    icon: 'icon-calculator',
    tooltip: () => (<i>设置为默认引擎</i>),
    onClick() {
      // TODO: set calculator as the default searcher
    },
  },
  content: {
    primaryText() {
      const math = formatInput(input);
      return `${math} =「${result}」`;
    },
  },
  suffix: {
    buttons: [
      {
        icon: 'icon-copy',
        tooltip: '复制到剪切板',
        async onClick() {
          try {
            await Clipboard.copyText(result);
            // TODO: notice user that the copy action has finished.
          } catch(error) {
            console.error(error);
          }
        },
      },
    ],
  },
  priority() {
    return isFormula(input) ? 100 : 0;
  },
});

export default createListItem;
export {
  createListItem,
};