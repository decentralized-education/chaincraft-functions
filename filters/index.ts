import { Web3FunctionContext } from '@gelatonetwork/web3-functions-sdk'
import { Filter, FilterCondition } from 'chaincraft-types'
import { blockNumberFilter } from './blocknumber'
import { gasPriceFilter } from './gasprice'
import { timestampFilter } from './timestamp'
import { newsApiFilter } from './newsapi'
import { coingeckoPriceFilter } from './coingecko'
import { walletJettonTrade } from './ton/walletJettonTrade'
import { recursiveTemplate } from '../utils'

export async function checkFilters(
    filtersGroups: Filter[][],
    context: Web3FunctionContext
): Promise<CheckFilterResult> {
    console.log('[checkFilters] filtersGroups ', filtersGroups)
    for (const filterGroup of filtersGroups) {
        // console.log("checkFilters: filterGroup ",filterGroup)
        const result = await checkFilterGroup(filterGroup, context)
        if (result.success) {
            console.log('checkFilters true ',result)
            return result
        }
    }
    console.log('[checkFilters] false')
    return {
        success: false
    }
}

export async function checkFilterGroup(
    filters: Filter[],
    context: Web3FunctionContext
): Promise<CheckFilterResult> {
    let groupResult = { success: true, outputs: {} }
    for (let filter of filters) {



        if(groupResult?.outputs && Object.keys(groupResult?.outputs).length > 0){
            filter = recursiveTemplate(filter, groupResult.outputs)
            console.log("[checkFilterGroup] filter after templating ",filter)
        }

        const result = await checkFilter(filter, context)
        if (!result || !result.success) {
            return { success: false }
        }
        groupResult.outputs = { ...groupResult.outputs, ...result.outputs }
    }
    return groupResult
}

export async function checkFilter(
    filter: Filter,
    context: Web3FunctionContext
): Promise<CheckFilterResult> {
    console.log('[checkFilter] ', filter.id, filter)

    if (!filter.condition) {
        filter.condition = FilterCondition.EQUAL
    }

    if (filter.id === 'GASPRICE' || filter.type === 'GASPRICE') {
        return await gasPriceFilter(filter, context)
    }
    if (filter.id === 'BLOCKNUMBER' || filter.type === 'BLOCKNUMBER') {
        return await blockNumberFilter(filter, context)
    }
    if (filter.id === 'TIMESTAMP' || filter.type === 'TIMESTAMP') {
        return await timestampFilter(filter, context)
    }
    if (filter.id === 'NEWSAPI' || filter.type === 'NEWSAPI') {
        return await newsApiFilter(filter, context)
    }
    if (filter.id === 'coingecko-price') {
        return await coingeckoPriceFilter(filter, context)
    }
    if (filter.id === 'ton-wallet-jetton-trade') {
        return await walletJettonTrade(filter, context)
    }
    console.log('[checkFilter] unknown filter id ', filter.id)
    return { success: false }
}

export interface CheckFilterResult {
    success: boolean
    outputs?: object
}
