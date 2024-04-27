import { Action, Filter, Web3FunctionContext, Web3FunctionResultCallData } from 'chaincraft-types'
import { Contract, ethers } from 'ethers'
import ERC20 from '../abi/ERC20'
import { ActionOptions } from '../types'

export async function sendEth(
    action: Action,
    context: Web3FunctionContext,
    options?: ActionOptions
): Promise<Web3FunctionResultCallData | false> {
    // is it able to send??? probably no
    return {
        to: action.toAddress!,
        data: '',
        value: ethers.utils.parseEther(action.value!).toHexString(),
    }
}