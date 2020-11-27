// component(ls-loading)
import component from './loading';
import directive from './directive';
import { defineInstallableComponent } from '<util>/common/plugin';

export default defineInstallableComponent(component, {
  uses: [
    directive
  ],
});