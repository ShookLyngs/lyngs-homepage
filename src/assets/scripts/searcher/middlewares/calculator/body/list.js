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
        icon: 'icon-no',
        tooltip: '禁用',
      },
      {
        icon: 'icon-copy',
        tooltip: '复制到剪切板',
        async onClick() {
          try {
            await this.$copyText(result);
            // TODO: notice user that the copy action has finished.
          } catch(error) {
            console.error(error);
          }
        },
      },
    ],
  },
});

export default createListItem;
export {
  createListItem,
};