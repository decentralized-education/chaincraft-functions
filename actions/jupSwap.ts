import axios from 'axios'
import { Web3FunctionContext, Web3FunctionResultCallData } from '@gelatonetwork/web3-functions-sdk'
import { Action } from 'chaincraft-types'
import { ActionOptions } from '../types'

export async function jupSwap(action: Action, context: Web3FunctionContext, options?: ActionOptions): Promise<Web3FunctionResultCallData | false> {
    try {
        const quoteResponse = await axios.get(`https://quote-api.jup.ag/v6/quote`, {
            params: {
                inputMint: action.fromTokenAddress,
                outputMint: action.toTokenAddress,
                amount: action.value,
                slippageBps: action.slippage,
            },
        })
        console.log('[jupSwap] quote response: ', quoteResponse.data)

        const serializedTransaction = await axios.post('https://quote-api.jup.ag/v6/swap', {
            quoteResponse: quoteResponse.data,
            userPublicKey: action.fromAddress,
            wrapAndUnwrapSol: true,
        })
       
         if (serializedTransaction.data.swapTransaction) {
             console.log('[jupSwap] swap transaction: ', serializedTransaction.data)
             return {
                 data: serializedTransaction.data.swapTransaction,
                 to: ''
             }
         }
         else { 
            console.log('[jupSwap] no swap tx returned')
            return false
         }
    } catch (error) {
        console.error('Error during quote and transaction handling: ', error)
        return false
    }
}
