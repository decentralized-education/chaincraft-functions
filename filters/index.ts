import { Web3FunctionContext } from '@gelatonetwork/web3-functions-sdk'
import { Filter } from 'chaincraft-types'
import { blockNumberFilter } from './blocknumber'
import { gasPriceFilter } from './gasprice'
import { timestampFilter } from './timestamp'
import { newsApiFilter } from './newsapi'

export async function checkFilters(
    filtersGroups: Filter[][],
    context: Web3FunctionContext
): Promise<boolean> {
    console.log('[checkFilters] filtersGroups ', filtersGroups)
    for (const filterGroup of filtersGroups) {
        // console.log("checkFilters: filterGroup ",filterGroup)
        const result = await checkFilterGroup(filterGroup, context)
        if (result) {
            console.log('checkFilters true')
            return true
        }
    }
    console.log('[checkFilters] false')
    return false
}

export async function checkFilterGroup(
    filters: Filter[],
    context: Web3FunctionContext
): Promise<boolean> {
    for (const filter of filters) {
        const result = await checkFilter(filter, context)
        if (!result) {
            return false
        }
    }
    return true
}

export async function checkFilter(
    filter: Filter,
    context: Web3FunctionContext
): Promise<boolean> {
    console.log('[checkFilter] ', filter)
    if (filter.id === 'GASPRICE') {
        return await gasPriceFilter(filter, context)
    }
    if (filter.id === 'BLOCKNUMBER') {
        return await blockNumberFilter(filter, context)
    }
    if (filter.id === 'TIMESTAMP') {
        return await timestampFilter(filter, context)
    }
    if (filter.id === 'NEWSAPI') {
        return await newsApiFilter(filter, context)
    }

    return false
}