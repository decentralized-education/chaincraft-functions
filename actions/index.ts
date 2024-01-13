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

    console.log('[prepareAction] unknown action type')
    return false
}
