import { Web3Function, Web3FunctionContext, Web3FunctionResultCallData } from '@gelatonetwork/web3-functions-sdk'
import { Action, EstimateInteraction } from 'chaincraft-types'
import { ActionOptions, SpellStepFunctions } from '../../types'
import estimate from './estimate'
import swap from './swap'


export const lifiSwap = {
    estimate: async (action: Action, context: Web3FunctionContext): Promise<EstimateInteraction | false> => {
        console.log('[lifiSwap - estimate] ', action)
        return estimate(context, action)
    },
    swap: async (action: Action, context: Web3FunctionContext, estimation: EstimateInteraction): Promise<Web3FunctionResultCallData | false> => {
        console.log('[lifiSwap - swap] ', action)
        return swap(context, action, estimation)
    },
}