import { jupSwap } from './jupSwap';
import { Action, Web3FunctionContext, Web3FunctionResultCallData } from 'chaincraft-types'
import { ActionOptions } from '../types'
// import { binanceTrade } from './binance/binanceTrade'
import { lifiSwap } from './lifiSwap'
// import { supplyAave } from './supplyAave'
import { socketSwap } from './socketSwap'
import { sendErc20 } from './sendErc20'
import { sendEth } from './sendEth'
// import { binanceWithdraw } from './binance/binanceWithdraw'
import { sendEmail } from './notifications/sendEmail'
// import { sendTelegramMessage } from "./notifications/sendTelegram";
import { dedustSwap } from './ton/dedustSwap'
import { recursiveTemplate } from '../utils'

export async function prepareAction(
    action: Action,
    context: Web3FunctionContext,
    options?: ActionOptions
): Promise<Web3FunctionResultCallData | false | true> {
    if (options?.outputs && Object.keys(options?.outputs).length > 0) {
        action = recursiveTemplate(action, options.outputs)
        console.log('[prepareAction] action after templating ', action)
    }

    if (action.type === 'SEND_NATIVE_ASSET' || action.id === 'SEND_NATIVE_ASSET') {
        return await sendEth(action, context, options)
    }
    if (action.type === 'SEND_ERC20' || action.id === 'SEND_ERC20') {
        return await sendErc20(action, context, options)
    }
    if (action.type === 'SWAP_LIFI' || action.id === 'SWAP_LIFI') {
        return await lifiSwap(action, context, options)
    }
    // if (action.id === 'binance-trade') {
    //     return await binanceTrade(action, context, options)
    // }
    // if (action.id === 'binance-withdraw') {
    //     return await binanceWithdraw(action, context, options)
    // }
    if (action.id === 'send-email') {
        return await sendEmail(action, context, options)
    }
    // if (action.id === 'send-telegram-message') {
    //     return await sendTelegramMessage(action, context, options)
    // }
    if (action.id === 'ton-dedust-jetton-trade') {
        return await dedustSwap(action, context, options)
    }
    // if (action.id === 'supply-aave') {
    //     return await supplyAave(action, context, options)
    // }
    if (action.id === 'socket-swap') {
        return await socketSwap(action, context, options)
    }

     if (action.id === 'jup-swap') {
         return await jupSwap(action, context, options)
     }

    console.log('[prepareAction] unknown action type')
    return false
}
