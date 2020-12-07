import { createResult } from '../../../body';

const createListItem = ({ input, result }) => createResult({
  prefix: {
    icon: 'icon-calculator',
    onClick() {
      // TODO: set calculator as the default searcher
    },
  },
  content: {
    primaryText: () => {
      const math = input.replace(/(=|\s+?)/g, '');
      return `计算 ${math} = 「${result}」`;
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