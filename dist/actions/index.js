"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareAction = void 0;
// import { binanceTrade } from './binance/binanceTrade'
const lifiSwap_1 = require("./lifi/lifiSwap");
const utils_1 = require("../utils");
async function prepareAction(action, context, options) {
    if (options?.outputs && Object.keys(options?.outputs).length > 0) {
        action = (0, utils_1.recursiveTemplate)(action, options.outputs);
        console.log('[prepareAction] action after templating ', action);
    }
    // if (action.type === 'SEND_NATIVE_ASSET' || action.id === 'SEND_NATIVE_ASSET') {
    //     return await sendEth(action, context, options)
    // }
    // if (action.type === 'SEND_ERC20' || action.id === 'SEND_ERC20') {
    //     return await sendErc20(action, context, options)
    // }
    if (action.type === 'SWAP_LIFI' || action.id === 'SWAP_LIFI') {
        return lifiSwap_1.lifiSwap;
    }
    // if (action.id === 'binance-trade') {
    //     return await binanceTrade(action, context, options)
    // }
    // if (action.id === 'binance-withdraw') {
    //     return await binanceWithdraw(action, context, options)
    // }
    // if (action.id === 'send-email') {
    //     return await sendEmail(action, context, options)
    // }
    // if (action.id === 'send-telegram-message') {
    //     return await sendTelegramMessage(action, context, options)
    // }
    // if (action.id === 'ton-dedust-jetton-trade') {
    //     return await dedustSwap(action, context, options)
    // }
    // if (action.id === 'supply-aave') {
    //     return await supplyAave(action, context, options)
    // }
    // if (action.id === 'socket-swap') {
    //     return await socketSwap(action, context, options)
    // }
    console.log('[prepareAction] unknown action type');
    return false;
}
exports.prepareAction = prepareAction;
