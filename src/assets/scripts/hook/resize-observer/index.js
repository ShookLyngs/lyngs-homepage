import { ref, watch, computed, onMounted, onBeforeUnmount } from 'vue';
import { animationFrameThrottle } from '<util>/common/event';
import ResizeObserver from 'resize-observer-polyfill';

export const useResize = ({ refName = 'resize-target', dom = {} }) => {
  const observer = ref(null);
  const element = ref(null);
  const state = ref({
    width: (dom.value || {}).clientWidth,
    height: (dom.value || {}).clientHeight,
  });

  const targetDOM = computed(() =>
    dom?.value || element?.value
  );

  const rebind = animationFrameThrottle(() => {
    console.log(element.value);
    if (observer.value) {
      observer.value.disconnect();
    }
    if (!targetDOM.value) {
      return;
    }

    observer.value = new ResizeObserver(entries => {
      entries.forEach(entry => {
        state.value = {
          width: entry.target.clientWidth,
          height: entry.target.clientHeight,
        };
      });
    });

    observer.value.observe(targetDOM.value);
  });

  watch(() => targetDOM.value, rebind);

  onMounted(() => {
    console.log(element);
    rebind();
  });
  onBeforeUnmount(() =>
    (observer.value && observer.value.disconnect())
  );

  return {
    [refName]: element,
    state,
  };
};
