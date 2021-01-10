// component(popper)
import component from './virtual-popper';
import directive from './directive';
import { defineInstallableComponent } from '<util>/common/plugin';

import './style.less';

export default defineInstallableComponent(component, {
  uses: [ directive ],
});