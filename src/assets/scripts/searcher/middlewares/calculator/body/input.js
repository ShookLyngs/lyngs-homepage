import { createResult } from '../../../body';

const createInput = ({ input, result }) => createResult({
  prefix: {
    icon: 'icon-calculator',
  },
  input: {
    placeholder: '快速计算',
    secondaryText: () => {
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
        }
      },
    ],
  },
});

export default createInput;
export {
  createInput,
};