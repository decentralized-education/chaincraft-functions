"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareAction = void 0;
const jupSwap_1 = require("./jupSwap");
// import { binanceTrade } from './binance/binanceTrade'
const lifiSwap_1 = require("./lifiSwap");
// import { supplyAave } from './supplyAave'
const socketSwap_1 = require("./socketSwap");
const sendErc20_1 = require("./sendErc20");
const sendEth_1 = require("./sendEth");
// import { binanceWithdraw } from './binance/binanceWithdraw'
const sendEmail_1 = require("./notifications/sendEmail");
// import { sendTelegramMessage } from "./notifications/sendTelegram";
const dedustSwap_1 = require("./ton/dedustSwap");
const utils_1 = require("../utils");
async function prepareAction(action, context, options) {
    if (options?.outputs && Object.keys(options?.outputs).length > 0) {
        action = (0, utils_1.recursiveTemplate)(action, options.outputs);
        console.log('[prepareAction] action after templating ', action);
    }
    if (action.type === 'SEND_NATIVE_ASSET' || action.id === 'SEND_NATIVE_ASSET') {
        return await (0, sendEth_1.sendEth)(action, context, options);
    }
    if (action.type === 'SEND_ERC20' || action.id === 'SEND_ERC20') {
        return await (0, sendErc20_1.sendErc20)(action, context, options);
    }
    if (action.type === 'SWAP_LIFI' || action.id === 'SWAP_LIFI') {
        return await (0, lifiSwap_1.lifiSwap)(action, context, options);
    }
    // if (action.id === 'binance-trade') {
    //     return await binanceTrade(action, context, options)
    // }
    // if (action.id === 'binance-withdraw') {
    //     return await binanceWithdraw(action, context, options)
    // }
    if (action.id === 'send-email') {
        return await (0, sendEmail_1.sendEmail)(action, context, options);
    }
    // if (action.id === 'send-telegram-message') {
    //     return await sendTelegramMessage(action, context, options)
    // }
    if (action.id === 'ton-dedust-jetton-trade') {
        return await (0, dedustSwap_1.dedustSwap)(action, context, options);
    }
    // if (action.id === 'supply-aave') {
    //     return await supplyAave(action, context, options)
    // }
    if (action.id === 'socket-swap') {
        return await (0, socketSwap_1.socketSwap)(action, context, options);
    }
    if (action.id === 'jup-swap') {
        return await (0, jupSwap_1.jupSwap)(action, context, options);
    }
    console.log('[prepareAction] unknown action type');
    return false;
}
exports.prepareAction = prepareAction;
