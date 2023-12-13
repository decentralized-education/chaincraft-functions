"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkFilter = exports.checkFilterGroup = exports.checkFilters = void 0;
const ethers_1 = require("ethers");
async function checkFilters(filtersGroups, context) {
    console.log('checkFilters filtersGroups ', filtersGroups);
    for (const filterGroup of filtersGroups) {
        // console.log("checkFilters: filterGroup ",filterGroup)
        const result = await checkFilterGroup(filterGroup, context);
        if (result) {
            console.log('checkFilters true');
            return true;
        }
    }
    console.log('checkFilters false');
    return false;
}
exports.checkFilters = checkFilters;
async function checkFilterGroup(filters, context) {
    console.log('queryFilterGroup filters ', filters);
    for (const filter of filters) {
        // console.log("checkFilterGroup: filter ",filter)
        const result = await checkFilter(filter, context);
        if (!result) {
            return false;
        }
    }
    return true;
}
exports.checkFilterGroup = checkFilterGroup;
async function checkFilter(filter, context) {
    console.log('checkFilter ', filter);
    if (filter.type === 'GASPRICE') {
        return await checkGasPriceFilter(filter, context);
    }
    if (filter.type === 'BLOCKNUMBER') {
        return await getBlockNumberFilter(filter, context);
    }
    return false;
}
exports.checkFilter = checkFilter;
const getBlockNumberFilter = async (filter, context) => {
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
const checkGasPriceFilter = async (filter, context) => {
    const { gelatoArgs } = context;
    const { gasPrice } = gelatoArgs;
    console.log('checkGasPriceFilter ', filter, gasPrice.toBigInt());
    const gasPriceGwei = gasPrice.div(10 ** 9);
    console.log('gasPrice ', gasPrice.toHexString());
    const filterValueGwei = ethers_1.BigNumber.from(filter.value);
    console.log('gasPriceGwei ', gasPriceGwei.toBigInt());
    console.log('filterValueGwei ', filterValueGwei.toBigInt());
    if (filter.condition === 'GREATER') {
        return gasPriceGwei.gte(filterValueGwei);
    }
    if (filter.condition === 'LESS') {
        console.log('is less ', gasPriceGwei.lte(filterValueGwei), gasPriceGwei.toBigInt());
        return gasPriceGwei.lte(filterValueGwei);
    }
    if (filter.condition === 'EQUAL') {
        return gasPriceGwei.eq(filterValueGwei);
    }
    return false;
};
// const timestamp = (await provider.getBlock("latest")).timestamp;
