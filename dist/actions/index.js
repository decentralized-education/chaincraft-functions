"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareAction = void 0;
const binanceTrade_1 = require("./binance/binanceTrade");
const lifiSwap_1 = require("./lifiSwap");
const sendErc20_1 = require("./sendErc20");
const sendEth_1 = require("./sendEth");
const binanceWithdraw_1 = require("./binance/binanceWithdraw");
const sendEmail_1 = require("./notifications/sendEmail");
async function prepareAction(action, context, options) {
    if (action.type === 'SEND_NATIVE_ASSET' ||
        action.id === 'SEND_NATIVE_ASSET') {
        return await (0, sendEth_1.sendEth)(action, context, options);
    }
    if (action.type === 'SEND_ERC20' || action.id === 'SEND_ERC20') {
        return await (0, sendErc20_1.sendErc20)(action, context, options);
    }
    if (action.type === 'SWAP_LIFI' || action.id === 'SWAP_LIFI') {
        return await (0, lifiSwap_1.lifiSwap)(action, context, options);
    }
    if (action.id === 'binance-trade') {
        return await (0, binanceTrade_1.binanceTrade)(action, context, options);
    }
    if (action.id === 'binance-withdraw') {
        return await (0, binanceWithdraw_1.binanceWithdraw)(action, context, options);
    }
    if (action.id === 'send-email') {
        return await (0, sendEmail_1.sendEmail)(action, context, options);
    }
    console.log('[prepareAction] unknown action type');
    return false;
}
exports.prepareAction = prepareAction;
