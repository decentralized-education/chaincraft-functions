import {
    Web3FunctionContext,
    Web3FunctionResultCallData,
} from '@gelatonetwork/web3-functions-sdk'
import { Action } from 'chaincraft-types'
import { ActionOptions } from '../types'
import { binanceTrade } from './binance/binanceTrade'
import { lifiSwap } from './lifiSwap'
import { sendErc20 } from './sendErc20'
import { sendEth } from './sendEth'
import { binanceWithdraw } from './binance/binanceWithdraw'
import { sendEmail } from './notifications/sendEmail'
import { sendTelegramMessage } from './notifications/sendTelegram'
import { dedustSwap } from './ton/dedustSwap'

export async function prepareAction(
    action: Action,
    context: Web3FunctionContext,
    options?: ActionOptions
): Promise<Web3FunctionResultCallData | false | true> {
    if (
        action.type === 'SEND_NATIVE_ASSET' ||
        action.id === 'SEND_NATIVE_ASSET'
    ) {
        return await sendEth(action, context, options)
    }
    if (action.type === 'SEND_ERC20' || action.id === 'SEND_ERC20') {
        return await sendErc20(action, context, options)
    }
    if (action.type === 'SWAP_LIFI' || action.id === 'SWAP_LIFI') {
        return await lifiSwap(action, context, options)
    }
    if (action.id === 'binance-trade') {
        return await binanceTrade(action, context, options)
    }
    if (action.id === 'binance-withdraw') {
        return await binanceWithdraw(action, context, options)
    }
    if (action.id === 'send-email') {
        return await sendEmail(action, context, options)
    }
    if (action.id === 'send-telegram-message') {
        return await sendTelegramMessage(action, context, options)
    }
    if(action.id === 'ton-dedust-jetton-trade'){
        return await dedustSwap(action, context, options)
    }

    console.log('[prepareAction] unknown action type')
    return false
}
