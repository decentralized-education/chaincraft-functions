"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gasPriceFilter = void 0;
const ethers_1 = require("ethers");
const gasPriceFilter = async (filter, context) => {
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
exports.gasPriceFilter = gasPriceFilter;
