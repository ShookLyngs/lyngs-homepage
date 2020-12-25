// component(ls-clipboard)
import component from './clipboard';
import { install, copyText } from './global';
import { defineInstallableComponent } from '<util>/common/plugin';

export default defineInstallableComponent(component, {
  uses: [{ install }],
  properties: { copyText },
});