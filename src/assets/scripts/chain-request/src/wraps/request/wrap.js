import { ChainBuilder } from '../../framework';
import { provideHttpClient, sendRequest } from './middlewares';

/**
 * @class ChainRequest
 * @extends ChainBuilder
 * @description ChainRequest is an extender of ChainBuilder.
 *              ChainRequest provides amount of request-helper-methods, 
 *              developers can use middlewares and helper-methods to do anything on a request mission.
 *              For example, you can decide what type of http-client is gonna be used on requesting.
 *              It's easy to switch http-client engine without dropping other setup.
 * @param {Object} caller - Vue instance, for chain-instance to access some properties.
 * @param {...Object} params - any value you wanna pass on context in chain-instance.
 */

class ChainRequest extends ChainBuilder {
    constructor(caller, ...params) {
        super({ caller }, ...params);
        super.use(provideHttpClient());
    }

    /**
     * @name start
     * @description Start the request progress.
     * @returns {Promise<ChainRequest>}
     */

    async start() {
        super.use(sendRequest());
        await super.start();
        return this;
    }


    /**
     * @name setup
     * @description Setup context before ChainRequest start to process.
     * @param {Function|Object} injection - (context: Object): Object
     * @returns {ChainRequest}
     */

    setup(injection) {
        const data = typeof injection === 'function' ?
            injection(super._context.data) : injection;

        super.context(data ?? {});
        return this;
    }

    /**
     * @method use
     * @description An router function, purpose to make open APIs of ChainRequest more unified.
     * @param arg {Object} - Config object.
     * @param arg.type {'middleware'|'setup'} - Function router type, use this to separate different uses.
     * @param arg.injection {Function|Object} - (context: Object): Object.
     * @returns {ChainRequest}
     */

    use({ type = 'middleware', injection }) {
        if (type === 'middleware') {
            super.use(injection);
        } else if (type === 'setup') {
            this.setup(injection);
        }
        return this;
    }
}

export {
    // classes
    ChainRequest,
};
export default ChainRequest;