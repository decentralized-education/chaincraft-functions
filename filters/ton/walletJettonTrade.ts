import { Web3FunctionContext } from '@gelatonetwork/web3-functions-sdk'
import { Filter } from 'chaincraft-types'
import { HttpClient, Api } from 'tonapi-sdk-js'
import {
    Address,
    TonClient,
    WalletContractV4,
    beginCell,
    fromNano,
} from '@ton/ton'
import 'cross-fetch/polyfill'

export const walletJettonTrade = async (
    filter: Filter,
    context: Web3FunctionContext
) => {
    try {
        console.log('[walletJettonTrade] ', filter)

        const apiKey =
            (await context.secrets.get('news-api-key')) ||
            process.env.TONAPI_KEY
        if (!apiKey) {
            console.error('[walletJettonTrade] apiKey not found')
            return false
        }
        const targetAddress = filter.fromAddress
        if (!targetAddress) {
            console.error('[walletJettonTrade] targetAddress not found')
            return false
        }
        const rawAddress = Address.parse(targetAddress)

        if (!targetAddress) {
            console.error('[walletJettonTrade] targetAddress not found')
            return false
        }
        const httpClient = new HttpClient({
            baseUrl: 'https://tonapi.io/',
            baseApiParams: {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    'Content-type': 'application/json',
                },
            },
        })
        const lastTimestampVariable = await context.storage.get(
            'last-timestamp'
        )
        let lastTimestamp = lastTimestampVariable ? +lastTimestampVariable : 0
        const options: {
            limit: number
            start_time?: number
        } = {
            limit: 20,
        }
        if (lastTimestamp) {
            options.start_time = +lastTimestamp
        }
        console.log('[walletJettonTrade] options ', options)
        const client = new Api(httpClient)
        const events = await client.accounts.getAccountEvents(
            targetAddress,
            options
        )
        const pendingTrades: {
            side: string
            symbol: string
            address: string
            amount: string
        }[] = []
        console.log('[walletJettonTrade] events ', events)
        for (const event of events.events) {
            // console.log("event ",event.actions)
            for (const action of event.actions) {
                if (action.JettonTransfer) {
                    console.log('[walletJettonTrade] action ', event.timestamp)
                    pendingTrades.push({
                        side:
                            action.JettonTransfer.senders_wallet ==
                            rawAddress.toString()
                                ? 'SELL'
                                : 'BUY',
                        symbol: action.JettonTransfer.jetton.symbol,
                        address: action.JettonTransfer.jetton.address,
                        amount: action.JettonTransfer.amount,
                    })
                }
            }
            if (event.timestamp > lastTimestamp) {
                lastTimestamp = event.timestamp
            }
        }
        if ('' + lastTimestamp != lastTimestampVariable) {
            console.log(
                '[walletJettonTrade] settting new lastTimestamp ',
                lastTimestamp
            )
            await context.storage.set(
                'last-timestamp',
                lastTimestamp.toString()
            )
        }

        console.log('[walletJettonTrade] pendingTrades ', pendingTrades)
        if (pendingTrades.length) {
            console.log('[walletJettonTrade] set pendingTrades ', pendingTrades)
            await context.storage.set(
                'pending-trades',
                JSON.stringify(pendingTrades)
            )
            return true
        }

        return false
    } catch (e) {
        console.log('[filters] getBlockNumberFilter error ', e)
    }

    return false
}
