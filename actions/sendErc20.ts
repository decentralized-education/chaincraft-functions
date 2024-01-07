import {
    Web3Function,
    Web3FunctionContext,
    Web3FunctionResultCallData,
} from '@gelatonetwork/web3-functions-sdk'
import { Action, Filter } from 'chaincraft-types'
import { Contract, ethers } from 'ethers'
import ERC20 from '../abi/ERC20'
import { ActionOptions } from '../types'

export async function sendErc20(
    action: Action,
    context: Web3FunctionContext,
    options?: ActionOptions
): Promise<Web3FunctionResultCallData | false> {
    const { multiChainProvider } = context

    const provider = multiChainProvider.default()

    console.log(
        '[sendErc20] ',
        'token=',
        action.tokenAddress,
        'fromAddress=',
        action.fromAddress,
        'toAddress=',
        action.toAddress,
        'options=',
        options
    )
    const erc20Contract = new Contract(action.tokenAddress!, ERC20, provider)

    // const code = await provider.getCode(action.address)
    // console.log("code ",code)
    const balanceOf = await erc20Contract.balanceOf(action.fromAddress)
    console.log('[sendErc20] balanceOf ', balanceOf)
    if (balanceOf < ethers.utils.parseUnits(action.value!, 'wei').toBigInt()) {
        console.log(
            `[sendErc20] not enough balance ${balanceOf} < ${ethers.utils
                .parseUnits(action.value!, 'wei')
                .toBigInt()}`
        )
        return false
    }

    if (!options?.sender) {
        console.log('[sendErc20] no sender')
        return false
    }

    try {
        // Sender is not the same as the fromAddress - using transferFrom
        if (
            options?.sender?.toLowerCase() !==
            action?.fromAddress?.toLowerCase()
        ) {
            let checkAllowance = await erc20Contract.allowance(
                action.fromAddress,
                options?.sender
            )
            console.log('[sendErc20] allowance is ', checkAllowance.toString())
            console.log(
                '[sendErc20] action.value ',
                action.value,
                ethers.utils
                    .parseUnits(action.value!, 'wei')
                    .toBigInt()
                    .toString()
            )
            if (
                checkAllowance <
                ethers.utils.parseUnits(action.value!, 'wei').toBigInt()
            ) {
                console.log(
                    `[sendErc20] not enough allowance ${checkAllowance} < ${ethers.utils
                        .parseUnits(action.value!, 'wei')
                        .toBigInt()}`
                )
                return false
            }

            console.log('[sendErc20] action.value ', action.value)
            const data = [
                action.fromAddress, // sender
                action.toAddress, // recipient
                action.value, // amount
            ]
            console.log('[sendErc20] data ', data)
            return {
                to: action.tokenAddress!,
                data: erc20Contract.interface.encodeFunctionData(
                    'transferFrom',
                    data
                ), //ethers.utils.parseUnits("0.0000001", "ether").toHexString(),
            }
        }
        console.log(
            '[sendErc20] sending from the same address, no allowance required'
        )

        console.log('[sendErc20] action.value ', action.value)
        const data = [
            action.toAddress, // recipient
            action.value, // amount
        ]
        console.log('[sendErc20] data ', data)
        // Calling transfer, not trasferFrom too!
        return {
            to: action.tokenAddress!,
            data: erc20Contract.interface.encodeFunctionData('transfer', data), //ethers.utils.parseUnits("0.0000001", "ether").toHexString(),
        }
    } catch (e) {
        console.log('[sendErc20] catch ', e)
        return false
    }
}