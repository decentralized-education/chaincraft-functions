"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.walletJettonTrade = void 0;
const tonapi_sdk_js_1 = require("tonapi-sdk-js");
const ton_1 = require("@ton/ton");
require("cross-fetch/polyfill");
const walletJettonTrade = async (filter, context) => {
    try {
        console.log('[walletJettonTrade] ', filter);
        const apiKey = (await context.secrets.get('news-api-key')) ||
            process.env.TONAPI_KEY;
        if (!apiKey) {
            console.error('[walletJettonTrade] apiKey not found');
            return false;
        }
        const targetAddress = filter.fromAddress;
        if (!targetAddress) {
            console.error('[walletJettonTrade] targetAddress not found');
            return false;
        }
        const rawAddress = ton_1.Address.parse(targetAddress);
        if (!targetAddress) {
            console.error('[walletJettonTrade] targetAddress not found');
            return false;
        }
        const httpClient = new tonapi_sdk_js_1.HttpClient({
            baseUrl: 'https://tonapi.io/',
            baseApiParams: {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    'Content-type': 'application/json',
                },
            },
        });
        const lastTimestampVariable = await context.storage.get('last-timestamp');
        let lastTimestamp = lastTimestampVariable ? +lastTimestampVariable : 0;
        const options = {
            limit: 20,
        };
        if (lastTimestamp) {
            options.start_time = +lastTimestamp;
        }
        console.log('[walletJettonTrade] options ', options);
        const client = new tonapi_sdk_js_1.Api(httpClient);
        const events = await client.accounts.getAccountEvents(targetAddress, options);
        const pendingTrades = [];
        console.log('[walletJettonTrade] events ', events);
        for (const event of events.events) {
            // console.log("event ",event.actions)
            for (const action of event.actions) {
                if (action.JettonTransfer) {
                    console.log('[walletJettonTrade] action ', event.timestamp);
                    pendingTrades.push({
                        side: action.JettonTransfer.senders_wallet ==
                            rawAddress.toString()
                            ? 'SELL'
                            : 'BUY',
                        symbol: action.JettonTransfer.jetton.symbol,
                        address: action.JettonTransfer.jetton.address,
                        amount: action.JettonTransfer.amount,
                    });
                }
            }
            if (event.timestamp > lastTimestamp) {
                lastTimestamp = event.timestamp;
            }
        }
        if ('' + lastTimestamp != lastTimestampVariable) {
            console.log('[walletJettonTrade] settting new lastTimestamp ', lastTimestamp);
            await context.storage.set('last-timestamp', lastTimestamp.toString());
        }
        console.log('[walletJettonTrade] pendingTrades ', pendingTrades);
        if (pendingTrades.length) {
            console.log('[walletJettonTrade] set pendingTrades ', pendingTrades);
            await context.storage.set('pending-trades', JSON.stringify(pendingTrades));
            return true;
        }
        return false;
    }
    catch (e) {
        console.log('[filters] getBlockNumberFilter error ', e);
    }
    return false;
};
exports.walletJettonTrade = walletJettonTrade;
