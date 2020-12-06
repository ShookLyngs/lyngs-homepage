import { createSandbox } from '<scripts>/sandbox';
import { createListItem, createInput, createFalse, createSwitch } from './body';

// global sandbox-instance
const sandbox = createSandbox('function');

export default {
  name: 'calculator',
  description: 'Calculate basic math for searcher.',
  version: '0.1.0',
  types: [
    'list',
    'input',
  ],
  async handler({ input }) {
    let result;

    try {
      result = await sandbox.postMessage({
        code: input,
      })?.result;
    } catch(error) {
      return createFalse({
        error,
      });
    }

    if (Number.isNaN(Number(result)) || result === null) {
      return createFalse({
        error: new Error('Result of calculation is incorrect'),
      });
    }

    return createSwitch({
      list: () => createListItem({ input, result }),
      input: () => createInput({ input, result })
    });
  }
};