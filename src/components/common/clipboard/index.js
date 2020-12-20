// component(ls-clipboard)
import component from './clipboard';
import global from './global';
import { defineInstallableComponent } from '<util>/common/plugin';

export default defineInstallableComponent(component, {
  uses: [ global ],
});