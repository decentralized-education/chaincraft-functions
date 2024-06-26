import { Filter, Web3FunctionContext } from 'chaincraft-types'
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
            return {success:timestamp > +filter.value!}
        }
        if (filter.condition === 'LESS') {
            return {success:timestamp < +filter.value!}
        }
        if (filter.condition === 'EQUAL') {
            return {success:timestamp === +filter.value!}
        }
    } catch (e) {
        console.log('[filters] getTimestampFilter error ', e)
    }

    return {success:false}
}