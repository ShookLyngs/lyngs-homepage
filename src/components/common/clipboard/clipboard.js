import Clipboard from 'clipboard';
import { ref, watchEffect } from "vue";

export default {
  name: 'ls-clipboard',
  setup() {
    const button = ref(null);

    const clipboard = ref(null);
    const updateInstance = () => {
      if (clipboard.value) {
        clipboard.value.destroy();
        clipboard.value = null;
      }
      clipboard.value = new Clipboard(button.value, {
        text: () => text.value,
      });
    };
    watchEffect(() => {
      if (button.value) {
        updateInstance();
      }
    });

    const text = ref(null);
    const copyText = (value) => {
      text.value = value;
      return new Promise((resolve, reject) => {
        clipboard.value.once('success', (event) => resolve(event));
        clipboard.value.once('error', (event) => reject(event));

        if (typeof button.value.click === 'function') {
          button.value.click();
        } else {
          reject(new Error('Button for Clipboard does not exists'));
        }
      });
    };

    return {
      button,
      clipboard,
      copyText,
    };
  },
  render() {
    return (
      <button
        class='ls-clipboard'
        ref="button"
      />
    );
  },
};