import { createFalse, createSwitch } from '../../body';
import createListItem from './list';
import createInput from './input';

export default {
  name: 'baidu',
  description: 'Straight link to google, and do nothing else.',
  version: '0.1.0',
  identifies: [ 'baidu', '百度' ],
  supportTypes: [
    'list',
    'input',
  ],
  async handler({ input }) {
    if (!input.trim()) {
      return createFalse({
        message: '输入为空',
      });
    }

    return createSwitch({
      list: () => createListItem({ ...this, input }),
      input: () => createInput({ ...this, input }),
    });
  }
};