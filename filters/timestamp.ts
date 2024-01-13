import {
    Web3Function,
    Web3FunctionContext,
} from '@gelatonetwork/web3-functions-sdk'
import { Filter } from 'chaincraft-types'
import { BigNumber } from 'ethers'
import moment from 'moment'

export const timestampFilter = async (
    filter: Filter,
    context: Web3FunctionContext
) => {
    try {
        console.log('[getTimestampFilter] ', filter)
        const provider = context.multiChainProvider.default()
        const timestamp = moment().unix()
        console.log('[getTimestampFilter] timestamp=', timestamp)

        if (filter.condition === 'GREATER') {
            return timestamp > +filter.value!
        }
        if (filter.condition === 'LESS') {
            return timestamp < +filter.value!
        }
        if (filter.condition === 'EQUAL') {
            return timestamp === +filter.value!
        }
    } catch (e) {
        console.log('[filters] getTimestampFilter error ', e)
    }

    return false
}