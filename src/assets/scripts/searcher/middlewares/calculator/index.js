import { createSandbox } from '<scripts>/sandbox';
import { createFalse, createSwitch } from '../../body';
import { createListItem, createInput, formatInput } from './body';

// global sandbox-instance
const sandbox = createSandbox('function');

export default {
  name: 'calculator',
  description: 'Calculate basic math for searcher.',
  version: '0.1.0',
  supportTypes: [
    'list',
    'input',
  ],
  async handler({ input }) {
    let message;

    try {
      message = await sandbox.postMessage({
        code: formatInput(input),
      });
    } catch(error) {
      return createFalse({
        error,
        message: `计算错误: ${error.message}`,
      });
    }

    const { result } = message;

    console.log(sandbox, input, result);

    if (Number.isNaN(Number(result)) || result === null) {
      return createFalse({
        message: '未得到有效的计算结果',
      });
    }

    return createSwitch({
      list: () => createListItem({ input, result }),
      input: () => createInput({ input, result }),
    });
  }
};