"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendErc20 = exports.sendEth = exports.prepareAction = void 0;
const ethers_1 = require("ethers");
const ERC20_1 = __importDefault(require("./abi/ERC20"));
const ERC20_ABI = ["function transferFrom(address, address, uint256)",
    "function allowance(address owner, address spender) external view returns (uint256)"
];
async function prepareAction(action, context, options) {
    if (action.type === "SEND_NATIVE_ASSET") {
        return await sendEth(action, context, options);
    }
    if (action.type === "SEND_ERC20") {
        return await sendErc20(action, context, options);
    }
    return false;
}
exports.prepareAction = prepareAction;
async function sendEth(action, context, options) {
    // is it able to send??? probably no
    return {
        to: action.toAddress,
        data: "",
        value: ethers_1.ethers.utils.parseEther(action.value).toHexString(),
    };
}
exports.sendEth = sendEth;
async function sendErc20(action, context, options) {
    const { multiChainProvider } = context;
    const provider = multiChainProvider.default();
    console.log("[sendErc20] ", "token=", action.tokenAddress, "fromAddress=", action.fromAddress, "toAddress=", action.toAddress, "options=", options);
    const erc20Contract = new ethers_1.Contract(action.tokenAddress, ERC20_1.default, provider);
    // const code = await provider.getCode(action.address) 
    // console.log("code ",code)
    // TODO: Check balance too
    try {
        if (!options?.sender) {
            console.log("[sendErc20] no sender");
            return false;
        }
        if (options?.sender?.toLowerCase() !== action?.fromAddress?.toLowerCase()) {
            let checkAllowance = await erc20Contract.allowance(action.fromAddress, options?.sender);
            console.log("[sendErc20] allowance is ", checkAllowance.toString());
            console.log("[sendErc20] action.value ", action.value, ethers_1.ethers.utils.parseUnits(action.value, "wei").toBigInt().toString());
            if (checkAllowance < ethers_1.ethers.utils.parseUnits(action.value, "wei").toBigInt()) {
                console.log(`[sendErc20] not enough allowance ${checkAllowance} < ${ethers_1.ethers.utils.parseUnits(action.value, "wei").toBigInt()}`);
                return false;
            }
        }
        else {
            console.log("[sendErc20] sending from the same address, no allowance required");
        }
    }
    catch (e) {
        console.log('[sendErc20] catch ', e);
    }
    console.log("[sendErc20] action.value ", action.value);
    const data = [
        action.fromAddress,
        action.toAddress,
        action.value // amount
    ];
    console.log("[sendErc20] data ", data);
    // TODO: Check allowance
    return {
        to: action.tokenAddress,
        data: erc20Contract.interface.encodeFunctionData("transferFrom", data), //ethers.utils.parseUnits("0.0000001", "ether").toHexString(),
    };
}
exports.sendErc20 = sendErc20;
