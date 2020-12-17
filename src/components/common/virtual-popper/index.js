// component(popper)
import component from './virtual-popper';
import directive from './directive';
import { defineInstallableComponent } from '<assets>/scripts/util/common/plugin';

export default defineInstallableComponent(component, {
  uses: [ directive ],
});