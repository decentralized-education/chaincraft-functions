import { Filter, Web3FunctionContext } from 'chaincraft-types'

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
            return {
                success: blockNumber > +filter.value!,
            }
        }
        if (filter.condition === 'LESS') {
            return {
                success: blockNumber < +filter.value!,
            }
        }
        if (filter.condition === 'EQUAL') {
            return {
                success: blockNumber === +filter.value!,
            }
        }
    } catch (e) {
        console.log('[filters] getBlockNumberFilter error ', e)
    }

    return { success: false }
}
