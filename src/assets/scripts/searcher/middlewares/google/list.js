import { createResult } from '../../body';

const createListItem = ({ input }) => createResult({
  prefix: {
    icon: 'icon-guge',
    tooltip: () => (<i>设置谷歌为默认引擎</i>),
    onClick() {
      // TODO: set calculator as the default searcher
    },
  },
  content: {
    primaryText: () => `在谷歌搜索「${input}」`,
    tooltip: () => (
      <div>
        <div>谷歌搜索</div>
        <div>「{input}」</div>
      </div>
    ),
  },
  suffix: {
    buttons: [
      {
        icon: 'icon-no',
        tooltip: '禁用',
      },
      {
        icon: 'icon-right',
        tooltip: '在谷歌搜索',
        async onClick() {
          const params = new URLSearchParams();
          params.set('q', input);
          window.open(`https://google.com/search?${params.toString()}`);
        },
      },
    ],
  },
});

export default createListItem;
export {
  createListItem,
};