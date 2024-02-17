import {
    Web3Function,
    Web3FunctionContext,
    Web3FunctionResultCallData,
} from '@gelatonetwork/web3-functions-sdk'
import { Action, Filter } from 'chaincraft-types'
import { Contract, ethers } from 'ethers'
import ERC20 from '../../abi/ERC20'
import { ActionOptions } from '../../types'
import axios from 'axios'

export async function dedustSwap(
    action: Action,
    context: Web3FunctionContext,
    options?: ActionOptions
): Promise<Web3FunctionResultCallData | false> {
    console.log("[dedustSwap] ",action)

    try{
        
    }catch(e:any){
        console.log("[dedustSwap] error ",e?.response?.data)
    }
    return false
}