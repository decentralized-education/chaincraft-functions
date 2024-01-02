"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blockNumberFilter = void 0;
const blockNumberFilter = async (filter, context) => {
    try {
        console.log('getBlockNumberFilter ', filter);
        const provider = context.multiChainProvider.default();
        const blockNumber = await provider.getBlockNumber();
        console.log('getBlockNumberFilter: ', blockNumber);
        if (filter.condition === 'GREATER') {
            return blockNumber > +filter.value;
        }
        if (filter.condition === 'LESS') {
            return blockNumber < +filter.value;
        }
        if (filter.condition === 'EQUAL') {
            return blockNumber === +filter.value;
        }
    }
    catch (e) {
        console.log('[filters] getBlockNumberFilter error ', e);
    }
    return false;
};
exports.blockNumberFilter = blockNumberFilter;
