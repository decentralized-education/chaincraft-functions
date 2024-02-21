import {
    Web3FunctionContext
} from '@gelatonetwork/web3-functions-sdk'
import { Filter } from 'chaincraft-types'
import { BigNumber } from 'ethers'

export const gasPriceFilter = async (
    filter: Filter,
    context: Web3FunctionContext
) => {
    const { gelatoArgs } = context
    const { gasPrice } = gelatoArgs
    console.log('checkGasPriceFilter ', filter, gasPrice.toBigInt())
    const gasPriceGwei = gasPrice.div(10 ** 9)
    console.log('gasPrice ', gasPrice.toHexString())
    const filterValueGwei = BigNumber.from(filter.value)
    console.log('gasPriceGwei ', gasPriceGwei.toBigInt())
    console.log('filterValueGwei ', filterValueGwei.toBigInt())
    if (filter.condition === 'GREATER') {
        return {
            success: gasPriceGwei.gte(filterValueGwei)
        }
    }
    if (filter.condition === 'LESS') {
        console.log(
            'is less ',
            gasPriceGwei.lte(filterValueGwei),
            gasPriceGwei.toBigInt()
        )
        return {
            success:gasPriceGwei.lte(filterValueGwei)
        }
    }
    if (filter.condition === 'EQUAL') {
        return {
            success:gasPriceGwei.eq(filterValueGwei)
        }
    }
    return {
        success: false,
    }
}