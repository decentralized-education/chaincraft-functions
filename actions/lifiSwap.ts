
import { Action, Filter, Web3FunctionContext, Web3FunctionResultCallData } from 'chaincraft-types'
import { Contract, ethers } from 'ethers'
import ERC20 from '../abi/ERC20'
import { ActionOptions } from '../types'
import axios from 'axios'

export async function lifiSwap(
    action: Action,
    context: Web3FunctionContext,
    options?: ActionOptions
): Promise<Web3FunctionResultCallData | false> {
    console.log("[lifiSwap] ",action)

    try{
        const lifiQuoteUrl = `https://li.quest/v1/quote`
        const params = {
            fromChain:"POL",
            // fromChain: action.data.fromchain,
            // toChain: action.data.tochain,
            toChain:"POL",
            fromToken: action.fromTokenAddress,
            toToken: action.toTokenAddress,
            fromAmount: action.value,
            fromAddress: action.fromAddress,
            order: "CHEAPEST",
            // slippage: "0.005",
            slippage: "0.05",
            integrator:"chaincraft.app",
            fee: 0,
            allowDestinationCall: false
        }
        console.log("[lifiSwap] params ",params)
        const { data } = await axios.get(lifiQuoteUrl,{
            params
        })
        // todo: check other
        console.log("[lifiSwap] data ",data)
        console.log("[lifiSwap] transactionRequest ",data?.transactionRequest)
        console.log("[lifiSwap] estimate ",data?.estimate)
        if(data?.transactionRequest){
            return {
                to: data?.transactionRequest?.to,
                data: data?.transactionRequest?.data,
                value: data?.transactionRequest?.value,
            }
        }
    }catch(e:any){
        console.log("[lifiSwap] error ",e?.response?.data)
    }
    return false
}