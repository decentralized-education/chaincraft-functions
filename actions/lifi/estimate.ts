import { Web3FunctionContext } from '@gelatonetwork/web3-functions-sdk/*'
import axios from 'axios'
import { Action, EstimateInteraction, InteractionType } from 'chaincraft-types'

const estimate = async (context: Web3FunctionContext, _action: Action): Promise<EstimateInteraction | false> => {
    try {
        const { value, fromAddress, fromTokenAddress, toTokenAddress, slippage } = _action

        const lifiQuoteUrl = `https://li.quest/v1/quote`
        const params = {
            fromChain: 'POL',
            // fromChain: action.data.fromchain,
            // toChain: action.data.tochain,
            toChain: 'POL',
            fromToken: fromTokenAddress,
            toToken: toTokenAddress,
            fromAmount: value,
            fromAddress: fromAddress,
            order: 'CHEAPEST',
            slippage: slippage || '0.05',
            integrator: 'chaincraft.app',
            fee: 0,
            allowDestinationCall: false,
        }
        console.log('[lifiSwap estimation] params ', params)
        const { data } = await axios.get(lifiQuoteUrl, {
            params,
        })

        if (data?.transactionRequest) {
            const tx = {
                to: data?.transactionRequest?.to,
                data: data?.transactionRequest?.data,
                value: data?.transactionRequest?.value,
            }
        }

        console.log('[lifiSwap estimation] data ', data)
        console.log('[lifiSwap estimation] estimate ', data?.estimate)
        const { action, estimate } = data
        const fromA = (Number(estimate.fromAmount) / Math.pow(10, action.fromToken.decimals)).toFixed(4)
        const toA = (Number(estimate.toAmount) / Math.pow(10, action.toToken.decimals)).toFixed(4)

        await context.storage.set(
            'estimation',
            JSON.stringify({
                type: InteractionType.ESTIMATE,
                fromToken: action.fromToken.symbol,
                toToken: action.toToken.symbol,
                fromAmount: fromA,
                toAmount: toA,
                // approvalAddress: estimate.approvalAddress,
                tx: {
                    to: data?.transactionRequest?.to,
                    data: data?.transactionRequest?.data,
                    value: data?.transactionRequest?.value,
                },
            })
        )

        return {
            type: InteractionType.ESTIMATE,
            fromToken: action.fromToken.symbol,
            toToken: action.toToken.symbol,
            fromAmount: fromA,
            toAmount: toA,
            // approvalAddress: estimate.approvalAddress,
            tx: {
                to: data?.transactionRequest?.to,
                data: data?.transactionRequest?.data,
                value: data?.transactionRequest?.value,
            },
            message: `Swap ${fromA} ${action.fromToken.symbol} to ${toA} ${action.toToken.symbol}`,
        }
    } catch (e: any) {
        console.log('[lifiSwap estimation] error ', e?.response?.data)
    }
    return false
}

export default estimate
