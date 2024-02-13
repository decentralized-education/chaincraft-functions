import { Web3FunctionContext } from '@gelatonetwork/web3-functions-sdk'
import { Filter } from 'chaincraft-types'
import { blockNumberFilter } from './blocknumber'
import { gasPriceFilter } from './gasprice'
import { timestampFilter } from './timestamp'
import { newsApiFilter } from './newsapi'
import { coingeckoPriceFilter } from './coingecko'
import { walletJettonTrade } from './ton/walletJettonTrade'
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
    console.log('[checkFilter] ', filter.id, filter)
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
    if(filter.id === 'ton-wallet-jetton-trade'){
        return await walletJettonTrade(filter, context)
    }
    console.log('[checkFilter] unknown filter id ', filter.id)
    return false
}
