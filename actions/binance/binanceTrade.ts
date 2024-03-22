// import {
//     Web3Function,
//     Web3FunctionContext,
//     Web3FunctionResultCallData,
// } from '@gelatonetwork/web3-functions-sdk'
// import { Action, Filter } from 'chaincraft-types'
// import { Contract, ethers } from 'ethers'
// import { ActionOptions } from '../../types'
// import axios from 'axios'
// import { MainClient, WebsocketClient, OrderSide } from 'binance'
// import _ from 'lodash'

// export async function binanceTrade(
//     action: Action,
//     context: Web3FunctionContext,
//     options?: ActionOptions
// ): Promise<Web3FunctionResultCallData | false | true> {
//     console.log("[binanceTrade] ",action)

//     try{
//         const binanceKey = await context.secrets.get('binance-api-key')
//         const binanceSecret = await context.secrets.get('binance-api-secret')


//         console.log("[binanceTrade] ",binanceKey,binanceSecret)
//         if(!binanceKey){
//             console.error("[binanceTrade] no key set up")
//             return false;
//         }

//         if(!binanceSecret){
//             console.error("[binanceTrade] no secret set up")
//             return false;
//         }

//         const symbol = _.get(action, "data.symbol")
//         const side = _.get(action, "data.side")

//         if(!side){
//             console.error("[binanceTrade] no side set up")
//             return false;
//         }

//         if(!symbol){
//             console.error("[binanceTrade] no symbol set up")
//             return false;
//         }

//         if(!action.value){
//             console.error("[binanceTrade] no amount set up")
//             return false; 
//         }
//         const binanceClient = new MainClient({
//             api_key: binanceKey,
//             api_secret: binanceSecret,
//         })

//         const response = await binanceClient.submitNewOrder({
//             symbol,
//             side: side,
//             type: "MARKET",
//             quantity: +action.value!
//         })
//         console.log("[binanceTrade] successful trade ",response)
//         if(response.orderId){
//             return true;
//         }
//     }catch(e:any){
//         console.error("[binanceTrade] error ",e)
//     }
//     return false
// }