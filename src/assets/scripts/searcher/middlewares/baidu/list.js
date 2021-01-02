import { createResult } from '<scripts>/searcher/body';
import { createBangContent, isBangInput } from '<scripts>/searcher/util/bang';
import { createLink } from '<scripts>/searcher/util/link';
import PeekSite from '<components>/view/peek-site';

const createListItem = ({ identifies, input }) => {
  const isBang = isBangInput(input, identifies);
  const bangContent = createBangContent(input, identifies);
  const link = createLink('https://m.baidu.com/s', { wd: input });

  return createResult({
    prefix: {
      icon: 'icon-baidu',
      tooltip: () => (<i>设置百度为默认引擎</i>),
    },
    content: {
      primaryText: () => `在百度搜索「${bangContent}」`,
      tooltip: () => (
        <PeekSite url={link} />
      ),
    },
    suffix: {
      buttons: [
        {
          icon: 'icon-right',
          tooltip: '在百度搜索',
          onClick: () => window.open(link),
        },
      ],
    },
    onClick: () => window.open(link),
    priority: () => isBang ? 50 : 0,
  });
};

export default createListItem;
export {
  createListItem,
};