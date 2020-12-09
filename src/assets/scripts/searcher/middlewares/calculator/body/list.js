import { createResult } from '../../../body';
import { formatInput } from './util';

const createListItem = ({ input, result }) => createResult({
  prefix: {
    icon: 'icon-calculator',
    onClick() {
      // TODO: set calculator as the default searcher
    },
  },
  content: {
    primaryText: () => {
      const math = formatInput(input);
      return `计算 ${math} =「${result}」`;
    },
  },
  suffix: {
    buttons: [
      {
        icon: 'icon-copy',
        onClick() {
          // TODO: copy result to the clipboard
        },
      },
    ],
  },
});

export default createListItem;
export {
  createListItem,
};