import {
    Web3Function,
    Web3FunctionContext,
    Web3FunctionResultCallData,
} from '@gelatonetwork/web3-functions-sdk'
import { Action, Filter } from 'chaincraft-types'
import { Contract, ethers } from 'ethers'
import { ActionOptions } from '../../types'
import axios from 'axios'
import { MainClient, WebsocketClient, OrderSide } from 'binance'
import _ from 'lodash'
import moment from 'moment'

export async function binanceWithdraw(
    action: Action,
    context: Web3FunctionContext,
    options?: ActionOptions
): Promise<Web3FunctionResultCallData | false | true> {
    console.log("[binanceWithdraw] ",action)

    try{



        const binanceKey = await context.secrets.get('binance-api-key')
        const binanceSecret = await context.secrets.get('binance-api-secret')


        if(!binanceKey){
            console.error("[binanceWithdraw] no key set up")
            return false;
        }

        if(!binanceSecret){
            console.error("[binanceWithdraw] no secret set up")
            return false;
        }

        const symbol = _.get(action, "data.symbol")
        const network = _.get(action, "data.network")
        if(!network){
            console.error("[binanceWithdraw] no network set up")
            return false;
        }

        if(!symbol){
            console.error("[binanceWithdraw] no symbol set up")
            return false;
        }

        if(!action.value){
            console.error("[binanceWithdraw] no amount set up")
            return false;
        }

        if(!action.toAddress){
            console.error("[binanceWithdraw] no address set up")
            return false;
        }
        const binanceClient = new MainClient({
            api_key: binanceKey,
            api_secret: binanceSecret,
        })


        // Checking the status of the withdrawal
        const withdrawId = await context.storage.get("withdrawal-id")
        if(withdrawId){
            console.log("[binanceWithdraw] withdrawId ",withdrawId)

            const result = await binanceClient.getWithdrawHistory({
                startTime: moment().add(-1, 'days').unix() * 1000,
                endTime: Date.now(),
                // coin: 'BNB',
            })
            const withdrawal = result.find((x) => x.id == withdrawId)

            if(withdrawal){
                console.log("[binanceWithdraw] withdrawal found ",withdrawal)
                return true;
            }
            return false;
        }else{
            console.log("[binanceWithdraw] withdrawId is empty")
        }

        const withdrawResult = await binanceClient.withdraw({
            network: network,
            coin: symbol,
            amount: +action.value,
            address: action.toAddress!
        })

        console.log("[binanceTrade] successful withdrawal ",withdrawResult)
        if(withdrawResult){
            await context.storage.set("withdrawal-id", withdrawResult.id)
        }
    }catch(e:any){
        console.error("[binanceWithdraw] error ",e)
    }
    return false
}