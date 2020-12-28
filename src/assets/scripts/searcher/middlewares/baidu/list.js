import { createResult } from '../../body';
import { createBangContent, isBangInput } from '../../util/bang';
import PeekSite from '<components>/business/peek-site';

const createListItem = ({ identifies, input }) => {
  const isBang = isBangInput(input, identifies);
  const bangContent = createBangContent(input, identifies);

  const link = () => {
    const params = new URLSearchParams({ wd: input });
    return`https://m.baidu.com/s?${params.toString()}`;
  };

  return createResult({
    prefix: {
      icon: 'icon-baidu',
      tooltip: () => (<i>设置百度为默认引擎</i>),
      onClick() {
        // TODO: set calculator as the default searcher
      },
    },
    content: {
      primaryText: () => `在百度搜索「${bangContent}」`,
      tooltip: () => (
        <PeekSite url={link()} />
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
          onClick: () => window.open(link()),
        },
      ],
    },
    priority() {
      return isBang ? 50 : 0;
    },
    onClick: () => window.open(link()),
  });
};

export default createListItem;
export {
  createListItem,
};