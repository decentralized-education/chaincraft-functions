import {
    Web3FunctionContext
} from '@gelatonetwork/web3-functions-sdk'
import { Filter } from 'chaincraft-types'

export const blockNumberFilter = async (
    filter: Filter,
    context: Web3FunctionContext
) => {
    try {
        console.log('getBlockNumberFilter ', filter)
        const provider = context.multiChainProvider.default()
        const blockNumber = await provider.getBlockNumber()
        console.log('getBlockNumberFilter: ', blockNumber)

        if (filter.condition === 'GREATER') {
            return blockNumber > +filter.value!
        }
        if (filter.condition === 'LESS') {
            return blockNumber < +filter.value!
        }
        if (filter.condition === 'EQUAL') {
            return blockNumber === +filter.value!
        }
    } catch (e) {
        console.log('[filters] getBlockNumberFilter error ', e)
    }

    return false
}