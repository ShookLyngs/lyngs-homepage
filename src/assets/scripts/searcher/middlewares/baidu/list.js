import { createResult } from '../../body';

const matchContent = input => {
  const matchName = (/^(?:百度|baidu)(?:(?:\s+)(.+))$/i).exec(input);
  return matchName && matchName[1] || input;
};

const createListItem = ({ input }) => createResult({
  prefix: {
    icon: 'icon-baidu',
    tooltip: () => (<i>设置百度为默认引擎</i>),
    onClick() {
      // TODO: set calculator as the default searcher
    },
  },
  content: {
    primaryText: () => `在百度搜索「${matchContent(input)}」`,
    tooltip: () => (
      <div>
        <div>百度搜索</div>
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
        tooltip: '在百度搜索',
        async onClick() {
          const params = new URLSearchParams({ wd: input });
          window.open(`https://baidu.com/s?${params.toString()}`);
        },
      },
    ],
  },
  priority() {
    const matchGrammar = /(百度|baidu)(\s(.+)?)$/i.test(input);
    console.log(matchGrammar);
    return matchGrammar ? 50 : 0;
  },
});

export default createListItem;
export {
  createListItem,
};