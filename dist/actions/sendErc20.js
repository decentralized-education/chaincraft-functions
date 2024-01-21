"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendErc20 = void 0;
const ethers_1 = require("ethers");
const ERC20_1 = __importDefault(require("../abi/ERC20"));
async function sendErc20(action, context, options) {
    const { multiChainProvider } = context;
    const provider = multiChainProvider.default();
    console.log('[sendErc20] ', 'token=', action.tokenAddress, 'fromAddress=', action.fromAddress, 'toAddress=', action.toAddress, 'options=', options);
    const erc20Contract = new ethers_1.Contract(action.tokenAddress, ERC20_1.default, provider);
    // const code = await provider.getCode(action.address)
    // console.log("code ",code)
    const balanceOf = await erc20Contract.balanceOf(action.fromAddress);
    console.log('[sendErc20] balanceOf ', balanceOf);
    if (balanceOf < ethers_1.ethers.utils.parseUnits(action.value, 'wei').toBigInt()) {
        console.log(`[sendErc20] not enough balance ${balanceOf} < ${ethers_1.ethers.utils
            .parseUnits(action.value, 'wei')
            .toBigInt()}`);
        return false;
    }
    if (!options?.sender) {
        console.log('[sendErc20] no sender');
        return false;
    }
    try {
        // Sender is not the same as the fromAddress - using transferFrom
        if (options?.sender?.toLowerCase() !==
            action?.fromAddress?.toLowerCase()) {
            let checkAllowance = await erc20Contract.allowance(action.fromAddress, options?.sender);
            console.log('[sendErc20] allowance is ', checkAllowance.toString());
            console.log('[sendErc20] action.value ', action.value, ethers_1.ethers.utils
                .parseUnits(action.value, 'wei')
                .toBigInt()
                .toString());
            if (checkAllowance <
                ethers_1.ethers.utils.parseUnits(action.value, 'wei').toBigInt()) {
                console.log(`[sendErc20] not enough allowance ${checkAllowance} < ${ethers_1.ethers.utils
                    .parseUnits(action.value, 'wei')
                    .toBigInt()}`);
                return false;
            }
            console.log('[sendErc20] action.value ', action.value);
            const data = [
                action.fromAddress,
                action.toAddress,
                action.value, // amount
            ];
            console.log('[sendErc20] data ', data);
            return {
                to: action.tokenAddress,
                data: erc20Contract.interface.encodeFunctionData('transferFrom', data), //ethers.utils.parseUnits("0.0000001", "ether").toHexString(),
            };
        }
        console.log('[sendErc20] sending from the same address, no allowance required');
        console.log('[sendErc20] action.value ', action.value);
        const data = [
            action.toAddress,
            action.value, // amount
        ];
        console.log('[sendErc20] data ', data);
        // Calling transfer, not trasferFrom too!
        return {
            to: action.tokenAddress,
            data: erc20Contract.interface.encodeFunctionData('transfer', data), //ethers.utils.parseUnits("0.0000001", "ether").toHexString(),
        };
    }
    catch (e) {
        console.log('[sendErc20] catch ', e);
        return false;
    }
}
exports.sendErc20 = sendErc20;
